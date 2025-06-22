const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const adminEmail = 'sanjanajha7644@gmail.com'; // Your static admin email

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-app-password'
  }
});

const sendEmailToAdmin = async (orderData) => {
  const mailOptions = {
    from: 'IceCream Shop <your-email@gmail.com>',
    to: adminEmail,
    subject: 'New Order Received',
    text: `
A new order has been placed:

Name: ${orderData.name}
Email: ${orderData.email}
Phone: ${orderData.phone}
Product: ${orderData.product}
Flavor: ${orderData.flavor}
Quantity: ${orderData.quantity}
Total: ₹${orderData.totalPrice}
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  router,
  sendEmailToAdmin
};
