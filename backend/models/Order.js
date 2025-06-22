const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  postal: String,
  country: String,
  payment: String,
  quantity: Number,
  flavor: String,
  product: String,
  orderDate: String,
  status: { type: String, default: 'Processing' },
  img: String,
  unitPrice: Number,
  totalPrice: Number
});

module.exports = mongoose.model('Order', orderSchema);
