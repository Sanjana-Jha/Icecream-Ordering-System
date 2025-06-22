// ✅ FINAL Buy.js (with inventory check from AdminPanel logic)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Buy = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', postal: '', country: '', payment: '', quantity: 1, flavor: '', product: ''
  });
  const [validPincodes, setValidPincodes] = useState([]);
  const [message, setMessage] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pincodes')
      .then(response => setValidPincodes(response.data))
      .catch(error => console.error("Error fetching pincodes:", error));
  }, []);

  useEffect(() => {
    fetch('/FoodCategory.json')
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
      })
      .catch((err) => console.error("Failed to load food data:", err));
  }, []);

  useEffect(() => {
    const trimmed = formData.postal.trim();
    if (trimmed === '') {
      setMessage('');
      setIsDeliveryAvailable(false);
      return;
    }
    const available = validPincodes.includes(trimmed);
    setIsDeliveryAvailable(available);
    setMessage(available ? '✅ Delivery is available in your area.' : '❌ Sorry, we do not deliver to this pincode yet.');
  }, [formData.postal, validPincodes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validPincodes.includes(formData.postal.trim());
    if (!isValid) {
      setMessage('❌ Cannot place order: delivery not available to this pincode.');
      return;
    }

    const selectedProductData = foodData.find(item => item.name === formData.product);
    const image = selectedProductData?.img || '';
    const price = selectedProductData?.options[0][formData.flavor] || 0;
    const totalPrice = price * formData.quantity;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const sameFlavorOrders = orders.filter(o => o.product === formData.product && o.flavor === formData.flavor);
    const maxQty = sameFlavorOrders[0]?.maxQuantity ?? 5;
    const totalOrdered = sameFlavorOrders.reduce((sum, o) => sum + Number(o.quantity), 0);
    const leftQty = maxQty - totalOrdered;

    if (leftQty < formData.quantity) {
      alert('❌ Cannot place order: this flavor is out of stock.');
      return;
    }

    const newOrder = {
      ...formData,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Processing',
      img: image,
      unitPrice: price,
      totalPrice: totalPrice,
      maxQuantity: maxQty // Persist maxQty per order item
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    alert('✅ Order placed successfully!');
    setFormData({ name: '', email: '', phone: '', address: '', city: '', postal: '', country: '', payment: '', quantity: 1, flavor: '', product: '' });
    setMessage('');
    setIsDeliveryAvailable(false);
  };

  const selectedProduct = foodData.find(p => p.name === formData.product);
  const availableFlavors = selectedProduct ? Object.keys(selectedProduct.options[0]) : [];

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Place Your Order</h2>
      <label style={styles.label}>Full Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
      <label style={styles.label}>Phone Number</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
      <label style={styles.label}>Shipping Address</label>
      <textarea name="address" value={formData.address} onChange={handleChange} style={styles.textarea} required />
      <label style={styles.label}>Pin Code</label>
      <input type="text" name="postal" value={formData.postal} onChange={handleChange} style={styles.input} required />
      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
      <label style={styles.label}>Select Product</label>
      <select name="product" value={formData.product} onChange={handleChange} style={styles.input} required>
        <option value="">-- Select Product --</option>
        {foodData.map((p, i) => (
          <option key={i} value={p.name}>{p.name}</option>
        ))}
      </select>
      <label style={styles.label}>Flavor</label>
      <select name="flavor" value={formData.flavor} onChange={handleChange} style={styles.input} required disabled={!formData.product}>
        <option value="">-- Select Flavor --</option>
        {availableFlavors.map((f, i) => (
          <option key={i} value={f}>{f}</option>
        ))}
      </select>
      <label style={styles.label}>Quantity</label>
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} style={styles.input} min="1" required />
      <label style={styles.label}>Payment Method</label>
      <select name="payment" value={formData.payment} onChange={handleChange} style={styles.input} required>
        <option value="">-- Select Payment Method --</option>
        <option value="credit-card">Credit Card / Debit Card</option>
        <option value="paypal">UPI</option>
        <option value="cod">Cash on Delivery</option>
      </select>
      <button type="submit" style={{
        ...styles.button,
        backgroundColor: isDeliveryAvailable ? '#28a745' : '#6c757d',
        cursor: isDeliveryAvailable ? 'pointer' : 'not-allowed'
      }} disabled={!isDeliveryAvailable}>
        Place Order
      </button>
    </form>
  );
};

const styles = {
  form: { maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' },
  heading: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  label: { marginTop: '1rem', marginBottom: '0.3rem', display: 'block', fontWeight: 'bold' },
  input: { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical', minHeight: '80px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', marginTop: '1.5rem', color: '#fff', fontSize: '1.1rem', border: 'none', borderRadius: '6px', transition: 'background-color 0.3s ease' },
};

export default Buy;
