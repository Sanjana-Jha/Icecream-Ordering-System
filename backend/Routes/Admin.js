const express = require('express');
const router = express.Router();
const AdminInfo = require('../models/AdminInfo');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = 'AdminJWTSecretKey123';
router.post('/loginadmin', [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const admin = await AdminInfo.findOne({ email });

    console.log("Login attempt:", email);                         // 👈 Debug email input
    console.log("Admin found:", admin);                           // 👈 Shows if admin was found

    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Password matches:", isMatch);                    // 👈 Shows result of password match

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ admin: { id: admin.id } }, jwtSecret, { expiresIn: '1h' });

    return res.json({ success: true, authToken: token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
