import React, { useState, useEffect } from 'react';

const Button = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: '24px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: '#1f1f1f',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      ...style
    }}
  >
    {children}
  </button>
);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetch('/FoodCategory.json')
      .then(res => res.json())
      .then(data => setFoodData(data))
      .catch(err => console.error('Failed to load food data:', err));
  }, []);

  useEffect(() => {
    const rawOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const sanitized = rawOrders.map(o => ({
      ...o,
      unitPrice: Number(o.unitPrice) || 0,
      totalPrice: Number(o.totalPrice) || 0,
    }));
    setOrders(sanitized);
  }, []);

  const getImageForProduct = (productName) => {
    const match = foodData.find(item => item.name === productName);
    return match ? match.img : 'https://via.placeholder.com/150';
  };

  const handleCancel = (idx) => {
    const updated = [...orders];
    updated[idx].status = 'Cancelled';
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    setShowDialog(false);
  };

  const getExpectedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toDateString();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #fff1c1, #ffd6e7, #e0cfff)',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        border: '1px solid #e0cfff'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#6b21a8',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          🍨 Your Ice-Cream Orders
          <div style={{
            height: '4px',
            width: '120px',
            background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
            margin: '8px auto',
            borderRadius: '4px'
          }} />
        </h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555', fontSize: '18px' }}>No orders placed yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {orders.map((order, i) => (
              <div key={i} style={{
                width: '300px',
                background: '#f3e8ff',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <img
                  src={getImageForProduct(order.product)}
                  alt={order.product}
                  style={{
                    height: '150px',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '12px'
                  }}
                />
                <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
                  <p>👤 {order.name}</p>
                  <p>🍦 {order.product}</p>
                  <p>🍧 {order.flavor}</p>
                  <p>🔢 <strong>Quantity:</strong> {order.quantity}</p>
                  <p>💰 <strong>Price:</strong> ₹{order.unitPrice.toFixed(2)}</p>
                  <p>💵 <strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>
                </div>
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px'
                }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: order.status === 'Cancelled' ? '#991b1b' :
                          order.status === 'Delivered' ? '#065f46' : '#92400e',
                    backgroundColor: order.status === 'Cancelled' ? '#fecaca' :
                                     order.status === 'Delivered' ? '#bbf7d0' : '#fde68a'
                  }}>
                    {order.status}
                  </span>
                  <Button
                    onClick={() => {
                      setSelectedOrder({ ...order, index: i });
                      setShowDialog(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------- POPUP MODAL --------------- */}
        {selectedOrder && showDialog && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '20px',
                textAlign: 'center',
                color: '#6b21a8'
              }}>
                📦 Order Details
              </h3>

              <img
                src={getImageForProduct(selectedOrder.product)}
                alt={selectedOrder.product}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginBottom: '20px'
                }}
              />

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '14px',
                color: '#333'
              }}>
                <p><strong>Name:</strong> {selectedOrder.name}</p>
                <p><strong>Email:</strong> {selectedOrder.email || 'N/A'}</p>
                <p><strong>Product:</strong> {selectedOrder.product}</p>
                <p><strong>Flavor:</strong> {selectedOrder.flavor}</p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p><strong>Unit Price:</strong> ₹{selectedOrder.unitPrice.toFixed(2)}</p>
                <p><strong>Total:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p style={{ gridColumn: '1 / -1' }}>
                  <strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postal}, {selectedOrder.country}
                </p>
                <p style={{ gridColumn: '1 / -1', fontWeight: 'bold', color: '#10b981' }}>
                  🚚 Expected Delivery: {getExpectedDeliveryDate()}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', gap: '12px' }}>
                {selectedOrder.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancel(selectedOrder.index)}
                    style={{
                      padding: '10px 18px',
                      background: 'linear-gradient(to right, #ef4444, #ec4899, #f59e0b)',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setShowDialog(false)}
                  style={{
                    padding: '10px 18px',
                    background: 'linear-gradient(to right, #4b5563, #1f2937)',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
