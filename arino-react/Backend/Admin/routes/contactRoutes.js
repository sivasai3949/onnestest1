const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET - Fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact messages.", error });
  }
});

// POST - Save a new contact message
router.post('/', async (req, res) => {
  try {
    const { fullName, email, product, mobile, message } = req.body;

    const newContact = new Contact({
      fullName,
      email,
      product,
      mobile,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact message saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact message.", error });
  }
});
router.get('/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching subscription count", err);
    res.status(500).send('Error fetching subscription count');
  }
});
module.exports = router;
