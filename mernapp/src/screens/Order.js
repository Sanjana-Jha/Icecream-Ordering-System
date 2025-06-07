import React, { useEffect, useState } from 'react';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ product: '', status: '' });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancel = (index) => {
    const updatedOrders = [...orders];
    if (updatedOrders[index].status === 'Processing') {
      updatedOrders[index].status = 'Cancelled';
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

  const filteredOrders = orders.filter(order => (
    (!filter.product || order.product === filter.product) &&
    (!filter.status || order.status === filter.status)
  ));

  const renderProgress = (status) => {
    const steps = ['Order Placed', 'Packed', 'Shipped', 'Delivered'];
    const statusIndex = {
      Processing: 2,
      Shipped: 3,
      Delivered: 4,
      Cancelled: -1
    }[status] || 0;

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {steps.map((step, index) => {
          const isComplete = index < statusIndex;
          const isCurrent = index === statusIndex - 1;
          const circleStyle = {
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            backgroundColor: isComplete ? '#28a745' : isCurrent ? '#ffc107' : '#f0f0f0',
            color: isComplete || isCurrent ? '#fff' : '#000',
            border: `2px solid ${isComplete ? '#28a745' : isCurrent ? '#ffc107' : '#ccc'}`
          };

          return (
            <div key={index} style={{ textAlign: 'center', minWidth: 70 }}>
              <div style={circleStyle}>
                {isComplete ? '✓' : isCurrent ? '•' : ''}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#28a745', marginTop: 4 }}>{step}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2rem' }}>Your Orders</h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <select
          value={filter.product}
          onChange={e => setFilter({ ...filter, product: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: 6 }}
        >
          <option value="">All Products</option>
          {[...new Set(orders.map(o => o.product))].map((prod, idx) => (
            <option key={idx} value={prod}>{prod}</option>
          ))}
        </select>

        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: 6 }}
        >
          <option value="">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No orders match your filter.</p>
      ) : (
        filteredOrders.map((order, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: 10,
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            {order.img && (
              <img
                src={order.img}
                alt={order.product}
                style={{
                  width: 120,
                  height: 'auto',
                  borderRadius: 10,
                  objectFit: 'cover',
                  alignSelf: 'center'
                }}
              />
            )}

            <div style={{ flex: 1, fontSize: '1rem', color: '#333', minWidth: 250 }}>
              <p><strong>Product:</strong> {order.product}</p>
              <p><strong>Flavor:</strong> {order.flavor}</p>
              <p><strong>Unit Price:</strong> ₹{order.unitPrice}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Date:</strong> {order.orderDate}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{ color: order.status === 'Cancelled' ? 'red' : 'inherit' }}>
                  {order.status}
                </span>
              </p>

              {renderProgress(order.status)}

              {order.status === 'Processing' && (
                <button
                  onClick={() => handleCancel(index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    marginTop: '1rem'
                  }}
                >
                  Cancel Order
                </button>
              )}

              {order.status === 'Delivered' && (
                <p style={{ marginTop: '1rem', color: 'green', fontWeight: 'bold' }}>✅ Delivered today</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
