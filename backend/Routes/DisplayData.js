
const express = require('express')
const router = express.Router()
const pincodes = ["110001", "400001", "560001", "700001"];
router.post('/pincodes', (req, res) => {
  try {

    res.json(pincodes);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error")
  }
})
module.exports = router;


