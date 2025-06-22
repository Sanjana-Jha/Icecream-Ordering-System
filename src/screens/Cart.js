import React from 'react';
import { useCart } from '../components/ContextRed';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const handleBuyClick = () => {
    navigate('/buy');
  };

  if (cart.length === 0)
    return <h2 style={{ textAlign: 'center', marginTop: '120px', color: '#842029' }}>🛒 Your cart is empty</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx} style={styles.tableRow}>
                <td style={styles.td}><img src={item.img} alt={item.name} style={styles.image} /></td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.size}</td>
                <td style={styles.td}>{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleBuyClick} style={buttonStyle}>
                  Buy
                </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '120px 2rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#842029',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8d7da',
    color: '#842029'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd'
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    textAlign: 'left'
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  tableRow: {
    transition: 'background 0.3s ease',
  },
  checkoutBtn: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#842029',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto'
  }
  
};
const buttonStyle = {
  marginTop: '30px',
  padding: '14px 28px',
  backgroundColor: '#842029',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};



export default Cart;




