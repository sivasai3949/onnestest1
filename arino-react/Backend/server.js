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

// Load environment variables
dotenv.config();

// Set the trust proxy for production (important for correct IP handling)
app.set('trust proxy', true); // <-- Add this line here to handle IPs correctly

// CORS configuration to allow requests from both testweb.onnes.in and www.testweb.onnes.in
app.use(cors({
  origin: ['http://localhost:3000','https://onnes.in','https://www.onnes.in' ],
  credentials: true
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/admin-contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin-subscribe', subscriptionRoutes); // Subscription routes
app.use('/api/admin-visitors', visitorRoutes); // Visitor routes

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});