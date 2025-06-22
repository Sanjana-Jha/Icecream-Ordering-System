import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    // Ensure maxQuantity default = 5 if missing in order
    const ordersWithDefaultMax = localOrders.map(o => ({
      ...o,
      maxQuantity: o.maxQuantity !== undefined ? o.maxQuantity : 5
    }));
    setOrders(ordersWithDefaultMax);

    fetch('/FoodCategory.json')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'black';
      case 'Processing': return 'blue';
      case 'Shipped': return 'orange';
      case 'Out for Delivery': return 'darkorange';
      case 'Delivered': return 'green';
      default: return 'gray';
    }
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const closeModal = () => setSelectedOrder(null);

  const card = {
    padding: '1rem',
    background: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    flex: '1 1 200px'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', padding: '1rem', background: '#f4f4f4', borderRight: '1px solid #ccc' }}>
        <h3 style={{ marginBottom: '2rem' }}>Admin Panel</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['dashboard', 'manage', 'orders', 'users', 'categories'].map(tab => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: activeTab === tab ? '#007bff' : 'transparent',
                color: activeTab === tab ? 'white' : 'black',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{
          background: '#222', color: 'white', padding: '1rem',
          display: 'flex', justifyContent: 'space-between'
        }}>
          <span>Admin Panel</span>
          <button onClick={logout} style={{
            background: '#dc3545', border: 'none', color: 'white',
            padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'
          }}>Logout</button>
        </div>

        {/* Content */}
        <div style={{ padding: '1rem', overflowY: 'auto' }}>

          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={card}>Total Orders: {orders.length}</div>
              <div style={card}>Delivered: {orders.filter(o => o.status === 'Delivered').length}</div>
              <div style={card}>Pending: {orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}</div>
              <div style={card}>Revenue: ₹{orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0)}</div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Manage Maximum Quantity per Flavor</h3>
              {categories.length === 0 ? (
                <p>No categories found.</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {categories.map((item, idx) => (
                    <div key={idx} style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '1rem',
                      background: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                      <img src={item.img} alt={item.name} style={{
                        width: '100%',
                        height: '160px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '0.8rem'
                      }} />
                      <div>
                        {Object.entries(item.options[0]).map(([flavor, price], i) => {
                          const flavorOrders = orders.filter(
                            o => o.product === item.name && o.flavor === flavor
                          );

                          const totalQty = flavorOrders.reduce(
                            (sum, o) => sum + Number(o.quantity || 0), 0
                          );

                          // Get maxQuantity from first order of this flavor, else default 5
                          const maxQty = flavorOrders[0]?.maxQuantity ?? 5;

                          // Calculate quantity left, but never below 0
                          const qtyLeftRaw = maxQty - totalQty;
                          const qtyLeft = qtyLeftRaw < 0 ? 0 : qtyLeftRaw;

                          return (
                            <div key={i} style={{
                              borderTop: '1px solid #eee',
                              paddingTop: '0.8rem',
                              marginTop: '0.8rem'
                            }}>
                              <strong>{flavor}</strong> (₹{price})
                              <div style={{ marginTop: '0.4rem' }}>
                                <div>Total Ordered: <strong>{totalQty}</strong></div>
                                <div style={{ margin: '0.3rem 0' }}>
                                  Max Allowed:
                                  <input
                                    type="number"
                                    min="1"
                                    style={{
                                      width: '60px',
                                      padding: '2px',
                                      marginLeft: '0.5rem'
                                    }}
                                    value={maxQty}
                                    onChange={(e) => {
                                      // Clamp to minimum 1
                                      let val = e.target.value;
                                      if (val === '') {
                                        val = 1;
                                      } else {
                                        val = Number(val);
                                        if (isNaN(val) || val < 1) val = 1;
                                      }

                                      // Update maxQuantity for all matching orders (or create new if none)
                                      let updatedOrders = [...orders];
                                      let found = false;

                                      updatedOrders = updatedOrders.map(o => {
                                        if (o.product === item.name && o.flavor === flavor) {
                                          found = true;
                                          return { ...o, maxQuantity: val };
                                        }
                                        return o;
                                      });

                                      // If no orders for this flavor exist, add a dummy order with maxQuantity (to track maxQuantity)
                                      if (!found) {
                                        updatedOrders.push({
                                          name: '',
                                          email: '',
                                          phone: '',
                                          address: '',
                                          city: '',
                                          postal: '',
                                          country: '',
                                          payment: '',
                                          quantity: 0,
                                          flavor,
                                          product: item.name,
                                          totalPrice: 0,
                                          status: 'Pending',
                                          orderDate: new Date().toLocaleDateString(),
                                          maxQuantity: val,
                                        });
                                      }

                                      setOrders(updatedOrders);
                                      localStorage.setItem('orders', JSON.stringify(updatedOrders));
                                    }}
                                  />
                                </div>
                                <div style={{
                                  color: qtyLeftRaw < 0 ? 'red' : 'green',
                                  fontWeight: 'bold'
                                }}>
                                  Quantity Left: {qtyLeft}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <>
              <h2>Recent Orders</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#eee' }}>
                    <th style={td}>Order ID</th>
                    <th style={td}>Customer</th>
                    <th style={td}>Items</th>
                    <th style={td}>Total</th>
                    <th style={td}>Status</th>
                    <th style={td}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td style={td}>#{String(index + 1).padStart(4, '0')}</td>
                      <td style={td}>{order.name}</td>
                      <td style={td}>{order.product} ({order.flavor})</td>
                      <td style={td}>₹{order.totalPrice}</td>
                      <td style={td}>
                        <select
                          value={order.status}
                          onChange={e => updateStatus(index, e.target.value)}
                          style={{
                            background: statusColor(order.status),
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                      <td style={td}>
                        <button onClick={() => setSelectedOrder(order)} style={{
                          background: '#007bff',
                          color: 'white',
                          padding: '4px 10px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'users' && (
            <div>
              <h3>Customers</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#eee' }}>
                    <th style={td}>Name</th>
                    <th style={td}>Email</th>
                    <th style={td}>Total Orders</th>
                    <th style={td}>Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {[...new Map(orders.map(order => [order.email, order]))].map(([email, order]) => {
                    const userOrders = orders.filter(o => o.email === email);
                    const totalSpent = userOrders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
                    return (
                      <tr key={email}>
                        <td style={td}>{order.name}</td>
                        <td style={td}>{email}</td>
                        <td style={td}>{userOrders.length}</td>
                        <td style={td}>₹{totalSpent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h3>Manage Product Categories</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {categories.map((cat, i) => (
                  <div key={i} style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '1rem',
                    width: '220px',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h4 style={{ margin: '0.5rem 0 0.3rem' }}>{cat.name}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal View */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: '8px',
            width: '90%', maxWidth: '500px', position: 'relative'
          }}>
            <h3>Order Details</h3>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postal}, {selectedOrder.country}</p>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Flavor:</strong> {selectedOrder.flavor}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Total Price:</strong> ₹{selectedOrder.totalPrice}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {selectedOrder.orderDate}</p>
            <button onClick={closeModal} style={{
              marginTop: '1rem', background: '#dc3545',
              color: 'white', padding: '8px 16px',
              border: 'none', borderRadius: '4px'
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const td = { padding: '8px', border: '1px solid #ccc' };
export default AdminPanel;
