import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    // You can replace this with real backend integration
    console.log('Form submitted:', form);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f9f5ff, #e0f2fe)',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#4f46e5'
      }}>
        📬 Contact Us
      </h2>
      <p style={{
        fontSize: '16px',
        marginBottom: '30px',
        color: '#4b5563'
      }}>
        We'd love to hear from you! Send us a message and we'll get back soon.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '1000px',
        width: '100%',
        gap: '40px',
        justifyContent: 'center'
      }}>
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: '1 1 400px',
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label>Name</label><br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Email</label><br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Message</label><br />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                resize: 'vertical'
              }}
              required
            />
          </div>
          <button type="submit" style={{
            backgroundColor: '#4f46e5',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s'
          }}>
            {submitted ? 'Message Sent ✅' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info and Map */}
        <div style={{
          flex: '1 1 400px',
          backgroundColor: '#ffffff',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>📍 Visit Us</h3>
          <p style={{ marginBottom: '10px' }}>
            <strong>Address:</strong><br />
            123 Ice Cream Street,<br />
            Sweet City, SC 45678
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Email:</strong> <a href="mailto:contact@icecreamhub.com">contact@icecreamhub.com</a>
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Phone:</strong> <a href="tel:+911234567890">+91 12345 67890</a>
          </p>
          <iframe
            src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="200"
            frameBorder="0"
            style={{ borderRadius: '12px' }}
            allowFullScreen
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
