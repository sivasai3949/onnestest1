// VisitorRoute.js
const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');
const Visitor = require('../models/Visitor');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const router = express.Router();

// ✅ Add this GET route
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch visitors', error });
  }
});

// Your existing POST route
router.post('/admin-visitor', async (req, res) => {
  const forwarded = req.headers['x-forwarded-for'];
  const realIp = forwarded ? forwarded.split(',')[0] : requestIp.getClientIp(req);
  const clientIp = realIp?.replace('::ffff:', '') || '0.0.0.0';

  try {
    const response = await axios.get(`https://ipapi.co/${clientIp}/json`);
    const { city, region, country, postal } = response.data;

    const newVisitor = new Visitor({
      ip: clientIp,
      city: city || 'Unknown',
      region: region || 'Unknown',
      postalCode: postal || 'Unknown',
      country: country || 'Unknown'
    });

    await newVisitor.save();
    res.status(200).send('Visitor data logged successfully!');
  } catch (err) {
    console.error("Error logging visitor:", err.message);
    res.status(500).send('Error logging visitor data');
  }
});


  // Add this route
router.get('/count', async (req, res) => {
  try {
    const count = await Visitor.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching visitor count", err);
    res.status(500).send('Error fetching visitor count');
  }
});

  
  module.exports = router;