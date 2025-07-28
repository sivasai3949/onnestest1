const express = require('express');
const router = express.Router();

// import your models
const Contact = require('../models/Contact');
const Subscription = require('../models/Subscription');
const Visitor = require('../models/Visitor');

/**
 * GET /api/week-data/:resource
 * resource = 'contacts' | 'subscribers' | 'visitors'
 * Returns JSON: { current: Number, previousWeek: Number }
 */
router.get('/:resource', async (req, res) => {
  console.log("📥 WeekDataRoute hit with resource:", req.params.resource); // <-- Add this
  try {
    const { resource } = req.params;
    let Model;

    switch (resource) {
      case 'contacts':
        Model = Contact;
        break;
      case 'subscribers':
        Model = Subscription;
        break;
      case 'visitors':
        Model = Visitor;
        break;
      default:
        return res.status(400).json({ message: 'Invalid resource type' });
    }

    const now = new Date();
    const startCurrent = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startPrevious = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // run counts in parallel
    const [current, previousWeek] = await Promise.all([
      Model.countDocuments({ createdAt: { $gte: startCurrent } }),
      Model.countDocuments({ createdAt: { $gte: startPrevious, $lt: startCurrent } })
    ]);
    console.log(`📊 ${resource} — Current: ${current}, Previous Week: ${previousWeek}`); // <== ADD THIS LINE

    res.status(200).json({ current, previousWeek });
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    res.status(500).json({ message: 'Server error fetching weekly data' });
  }
});

module.exports = router;
