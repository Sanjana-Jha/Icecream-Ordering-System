import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart } from './ContextRed';
import axios from 'axios';

const products = [
  { name: 'Cups', img: '/card4.jpg' },
  { name: 'Cone', img: '/card3.jpg' },
  { name: 'Sticks', img: '/card2.jpg' },
  { name: 'Family Pack', img: '/card1.jpg' }
];

function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();

  const [formData, setFormData] = useState(
    products.reduce((acc, product) => {
      acc[product.name] = { qty: 1, size: 'Chocolate' };
      return acc;
    }, {})
  );

  const [pincode, setPincode] = useState('');
  const [validPincodes, setValidPincodes] = useState([]);
  const [message, setMessage] = useState('');
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
  const [showModal, setShowModal] = useState(true); // Auto show on page load

  useEffect(() => {
    axios.get('http://localhost:5000/api/pincodes')
      .then((response) => setValidPincodes(response.data))
      .catch((error) => console.error("Error fetching pincodes:", error));
  }, []);

  const handleChange = (name, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [field]: value
      }
    }));
  };

  const handleBuyClick = () => {
    navigate('/buy');
  };

  const handleAddToCart = (product) => {
    const { qty, size } = formData[product.name];
    dispatch({
      type: 'ADD',
      name: product.name,
      qty,
      size,
      img: product.img
    });
    alert(`${product.name} added to cart`);
  };

  const handleCheckPincode = () => {
    const trimmed = pincode.trim();
    const available = validPincodes.includes(trimmed);
    setIsDeliveryAvailable(available);
    setMessage(
      trimmed === ''
        ? ''
        : available
        ? '✅ Delivery is available in your area.'
        : '❌ Sorry, we do not deliver to this pincode yet.'
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '50px', color: '#d63384', fontWeight: "600" }}>Our Products</h1>
      <div className="product-container" style={containerStyle}>
        {products.map((product) => (
          <div key={product.name} className="card" style={cardStyle}>
            <img
              src={product.img}
              alt={product.name}
              style={{ height: '180px', objectFit: 'cover', width: '100%' }}
            />
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title">{product.name}</h5>
              <div className="container w-100">
                <select
                  className="m-2 rounded text-white"
                  style={{ backgroundColor: 'rgb(15, 118, 110)' }}
                  onChange={(e) => handleChange(product.name, 'qty', e.target.value)}
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="m-2 rounded text-white"
                  style={{ backgroundColor: 'rgb(15, 118, 110)' }}
                  onChange={(e) => handleChange(product.name, 'size', e.target.value)}
                >
                  <option value="Chocolate">Chocolate</option>
                  <option value="Strawberry">Strawberry</option>
                  <option value="Vanilla">Vanilla</option>
                  <option value="Butter Scoth">Butter Scoth</option>
                </select>
              </div>
              <hr />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={handleBuyClick}
                  style={buyButtonStyle}
                >
                  Buy
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={cartButtonStyle}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    

      {/* Popup */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h4 style={{ marginBottom: '15px', color: '#0d9488' }}>Enter your Pincode</h4>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              style={{
                padding: '10px',
                width: '80%',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginBottom: '12px',
                fontSize: '14px'
              }}
            />
            <div>
              <button
                onClick={handleCheckPincode}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0d9488',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Check
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#d33',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
            {message && (
              <p style={{ marginTop: '12px', fontWeight: 'bold', color: isDeliveryAvailable ? 'green' : 'red' }}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}

      <style>{`
        button:hover {
          background-color: rgb(148, 13, 80) !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '45px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  width: '265px'
};

const cardBodyStyle = {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
};

const buyButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#0d9488',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  flex: '1',
  margin: '0 4px',
  transition: 'background-color 0.2s ease'
};

const cartButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#0d9488',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  flex: '1',
  margin: '0 4px',
  transition: 'background-color 0.2s ease'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContent = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  textAlign: 'center',
  width: '320px'
};

export default Card;
