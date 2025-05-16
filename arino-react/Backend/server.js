const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const contactRoutes = require('../Backend/Admin/routes/contactRoutes');
const adminAuthRoutes = require('../Backend/Admin/routes/adminAuthRoutes');
const subscriptionRoutes = require('../Backend/Admin/routes/subscriptionRoutes');
const visitorRoutes = require('../Backend/Admin/routes/VisitorRoute');

// Load environment variables
dotenv.config();
app.set('trust proxy', true);

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://onnes.in', 'https://www.onnes.in'],
  credentials: true
}));

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => console.error('MongoDB connection error:', err));

// ✅ Serve static images from /public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API routes
app.use('/api/admin-contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin-subscribe', subscriptionRoutes);
app.use('/api/admin-visitors', visitorRoutes);

// Meta preview rendering function
const BASE_URL = 'https://onnes.in';
function sendMetaPage(res, { title, description, imageUrl, url }) {
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${imageUrl}" />
      <meta property="og:url" content="${url}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="${imageUrl}" />
    </head>
    <body>
      <script>window.location.href = "${url}";</script>
    </body>
    </html>
  `);
}

// Updated list of meta routes with new image filenames
const metaRoutes = [
  {
    path: '/about',
    meta: {
      title: 'About Onnes Cryogenics',
      description: 'Onnes Cryogenics was formed in Hyderabad, India by physicists Dr. Ram Aluru and Dr. Vikram Srinivasa Raghavan.',
      imageUrl: `${BASE_URL}/images/aboutus.webp`,
      url: `${BASE_URL}/about`
    }
  },
  {
    path: '/team',
    meta: {
      title: 'Our Team - Onnes Cryogenics',
      description: 'Founders Dr. Ram and Dr. Vikram bring deep expertise in cryogenics, carbon composites, and applied physics.',
      imageUrl: `${BASE_URL}/images/team.webp`,
      url: `${BASE_URL}/team`
    }
  },
  {
    path: '/technology',
    meta: {
      title: 'Technology at Onnes Cryogenics',
      description: 'Advanced cryogenic tanks made with CFRP to support the future of clean energy and aerospace.',
      imageUrl: `${BASE_URL}/images/technology.webp`,
      url: `${BASE_URL}/technology`
    }
  },
  {
    path: '/spaceportfolio',
    meta: {
      title: 'Space Portfolio - Onnes Cryogenics',
      description: 'Ultra-low temperature systems for space and industrial applications using cryogenics.',
      imageUrl: `${BASE_URL}/images/spaceportfolio.webp`,
      url: `${BASE_URL}/spaceportfolio`
    }
  },
  {
    path: '/ai-simulation',
    meta: {
      title: 'AI Simulation - Onnes Cryogenics',
      description: 'AI-driven Cryogenic Fluid Management (CFM) for future aerospace and quantum systems.',
      imageUrl: `${BASE_URL}/images/aisimulation.webp`,
      url: `${BASE_URL}/ai-simulation`
    }
  }
];

// Bot detection
function isBot(userAgent) {
  return /bot|crawl|slurp|spider|facebookexternalhit|twitterbot|whatsapp/i.test(userAgent);
}

// Meta preview route handling
metaRoutes.forEach(({ path, meta }) => {
  app.get(path, (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    if (isBot(userAgent)) {
      sendMetaPage(res, meta);
    } else {
      res.sendFile(path.join(__dirname, '../../build/index.html'));
    }
  });
});

// Static assets
app.use(express.static(path.join(__dirname, '../../build')));

// Fallback to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
