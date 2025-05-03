const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const contactRoutes = require('../Backend/Admin/routes/contactRoutes');
const adminAuthRoutes = require('../Backend/Admin/routes/adminAuthRoutes');
const subscriptionRoutes = require('../Backend/Admin/routes/subscriptionRoutes'); // New Subscription Routes
const visitorRoutes = require('../Backend/Admin/routes/VisitorRoute'); // New Visitor Routes

dotenv.config();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/admin-contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin-subscribe', subscriptionRoutes); // Add subscription routes
app.use('/api/admin-visitors', visitorRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
