const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  product: String,
  category: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
