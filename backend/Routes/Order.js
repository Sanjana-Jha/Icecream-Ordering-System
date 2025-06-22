const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmailToAdmin = require('./Email').sendEmailToAdmin;

router.post('/place', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // Notify admin via email
    await sendEmailToAdmin(req.body);

    res.status(201).json({ success: true, message: 'Order placed and email sent to admin' });
  } catch (err) {
    console.error('Order saving error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
