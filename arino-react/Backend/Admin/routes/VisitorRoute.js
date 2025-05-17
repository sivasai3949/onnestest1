// ✅ Updated Visitor route.js to exclude localhost IPs

const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');
const Visitor = require('../models/Visitor');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// ✅ GET all visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch visitors', error });
  }
});

// ✅ Log visitor data
router.post('/admin-visitor', async (req, res) => {
  try {
    let clientIp = req.ip || requestIp.getClientIp(req);

    // Clean up IP (e.g., "::ffff:192.0.2.1" → "192.0.2.1")
    if (clientIp?.includes('::ffff:')) {
      clientIp = clientIp.split('::ffff:')[1];
    }

    // Exclude localhost IPs
    const isLocalhost = ['::1', '127.0.0.1', '0.0.0.0'].includes(clientIp);
    if (isLocalhost) {
      return res.status(200).send('Localhost IP ignored');
    }

    const response = await axios.get(`https://ipapi.co/${clientIp}/json`);
    const { city, region, country_name, postal } = response.data;

    const newVisitor = new Visitor({
      ip: clientIp || '0.0.0.0',
      city: city || 'Unknown',
      region: region || 'Unknown',
      postalCode: postal || 'Unknown',
      country: country_name || 'Unknown'
    });

    await newVisitor.save();
    res.status(200).send('Visitor data logged successfully!');
  } catch (err) {
    console.error("Error logging visitor:", err.message);
    res.status(500).send('Error logging visitor data');
  }
});

// ✅ Count route
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
