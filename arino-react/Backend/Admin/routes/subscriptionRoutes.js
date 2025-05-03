const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// POST - Add a new subscription
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "This email is already subscribed." });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing.", error });
  }
});

// GET - Get all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions.", error });
  }
});


// Add this route
router.get('/count', async (req, res) => {
  try {
    const count = await Subscription.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching subscription count", err);
    res.status(500).send('Error fetching subscription count');
  }
});

module.exports = router;
