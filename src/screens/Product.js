import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart } from '../components/ContextRed';
import Navbar from '../components/Navbar';

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();

  const [formData, setFormData] = useState({});
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetch('/FoodCategory.json')
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
        const initialFormData = {};
        data.forEach((item) => {
          initialFormData[item.name] = {
            qty: 1,
            size: Object.keys(item.options[0])[0]
          };
        });
        setFormData(initialFormData);
      })
      .catch((err) => console.error("Failed to load food data:", err));
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

  const handleAddToCart = (item) => {
    const { qty, size } = formData[item.name];
    const price = item.options[0][size] * qty;

    dispatch({
      type: 'ADD',
      name: item.name,
      qty,
      size,
      price,
      img: item.img
    });

    alert(`${item.name} added to cart`);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center', marginTop: '50px', color: '#d63384', fontWeight: '600' }}>
        Our Products
      </h1>

      {foodData.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading products...</p>
      ) : (
        <div style={containerStyle}>
          {foodData.map((item) => {
            const selectedSize = formData[item.name]?.size || Object.keys(item.options[0])[0];
            const selectedQty = formData[item.name]?.qty || 1;
            const price = item.options[0][selectedSize] * selectedQty;

            return (
              <div key={item.name} style={cardStyle}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                />
                <div style={cardBodyStyle}>
                  <h5 style={{ marginBottom: '12px', color: '#333' }}>{item.name}</h5>
                  <div className="container w-100 mb-3">
                    <select
                      className="m-2 rounded text-white"
                      style={selectStyle}
                      value={selectedQty}
                      onChange={(e) => handleChange(item.name, 'qty', parseInt(e.target.value))}
                    >
                      {Array.from({ length: 6 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      className="m-2 rounded text-white"
                      style={selectStyle}
                      value={selectedSize}
                      onChange={(e) => handleChange(item.name, 'size', e.target.value)}
                    >
                      {Object.entries(item.options[0]).map(([flavor]) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  </div>
                  <hr />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#0d9488', fontSize: '18px' }}>
                        ₹{price}
                      </span>
                      <button onClick={() => handleAddToCart(item)} style={textButtonStyle}>
                        Add to Cart
                      </button>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <button onClick={handleBuyClick} style={{ ...textButtonStyle, width: '100%' }}>
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        button:hover {
          background-color: #d63384 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}

// ======= Styles =======

const containerStyle = {
  padding: '20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '30px',
  maxWidth: '1000px',
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
  width: '100%' // allow full width inside grid cell
};


const cardBodyStyle = {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1
};

const selectStyle = {
  backgroundColor: 'rgb(15, 118, 110)',
  color: '#fff',
  padding: '6px 10px',
  border: 'none'
};

const textButtonStyle = {
  padding: '8px 14px',
  backgroundColor: '#fff',
  color: '#0d9488',
  border: '2px solid #0d9488',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease-in-out'
};

export default Product;
