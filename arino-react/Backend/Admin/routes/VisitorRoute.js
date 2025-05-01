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
    const clientIp = requestIp.getClientIp(req);
  
    try {
      const response = await axios.get(`http://ipinfo.io/${clientIp}/json?token=${process.env.IPINFO_API_TOKEN}`);
      const { city, region, country, postal } = response.data;
  
      const newVisitor = new Visitor({
        ip: clientIp,
        city,
        region,
        postalCode: postal,
        country
      });
  
      await newVisitor.save();
      res.status(200).send('Visitor data logged successfully!');
    } catch (err) {
      console.error("Error logging visitor:", err);
      res.status(500).send('Error logging visitor data');
    }
  });
  
  module.exports = router;