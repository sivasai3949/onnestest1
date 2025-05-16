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

// Trust proxy setting for accurate IP handling
app.set('trust proxy', true);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://onnes.in', 'https://www.onnes.in'],
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/admin-contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin-subscribe', subscriptionRoutes);
app.use('/api/admin-visitors', visitorRoutes);

// // Helper function for bot-friendly meta HTML
// function sendMetaPage(res, { title, description, imageUrl, url }) {
//   res.set('Cache-Control', 'public, max-age=3600');
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <title>${title}</title>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content="${title}" />
//       <meta property="og:description" content="${description}" />
//       <meta property="og:image" content="${imageUrl}" />
//       <meta property="og:url" content="${url}" />
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content="${title}" />
//       <meta name="twitter:description" content="${description}" />
//       <meta name="twitter:image" content="${imageUrl}" />
//     </head>
//     <body>
//       <h1>${title}</h1>
//       <p>${description}</p>
//     </body>
//     </html>
//   `);
// }

// const BASE_URL = 'https://onnes.in';

// // --------- Rich Preview Routes ---------

// // 1) /about (bot detection added)
// app.get('/about', (req, res) => {
//   const userAgent = req.headers['user-agent'] || '';
//   const isBot = /bot|facebookexternalhit|whatsapp|crawler|spider|facebook|twitter/i.test(userAgent);

//   if (isBot) {
//     sendMetaPage(res, {
//       title: 'About Onnes Cryogenics',
//       description: 'Onnes Cryogenics was formed in Hyderabad, India by physicists Dr. Ram Aluru, who specialises in cryogenics, and Dr. Vikram Srinivasa Raghavan, whose expertise is in composite engineering and nanophysics.',
//       imageUrl: `${BASE_URL}/images/aboutus_2.png`,
//       url: `${BASE_URL}/about`
//     });
//   } else {
//     res.sendFile(path.join(__dirname, '../../build/index.html'));
//   }
// });


// // 2) /team
// app.get('/team', (req, res) => {
//   sendMetaPage(res, {
//     title: 'Our Team - Onnes Cryogenics',
//     description: 'Dr. Ram K Aluru and Dr. Vikram are founders with expertise in cryogenics, composite engineering, and nanophysics. Ram holds a Ph.D. in quantum material science, and Vikram has 14 years of experience in applied physics and carbon composites.',
//     imageUrl: `${BASE_URL}/images/ram-k-aluru.jpg`,
//     url: `${BASE_URL}/team`
//   });
// });

// // 3) /technology
// app.get('/technology', (req, res) => {
//   sendMetaPage(res, {
//     title: 'Technology at Onnes Cryogenics',
//     description: 'Carbon Fibre Reinforced Plastic (CFRP) tanks represent a cutting-edge solution for gas and cryogens storage, addressing crucial challenges in the clean energy sector.',
//     imageUrl: `${BASE_URL}/images/Onnes-2L-Type-3.webp`,
//     url: `${BASE_URL}/technology`
//   });
// });

// // 4) /spaceportfolio
// app.get('/spaceportfolio', (req, res) => {
//   sendMetaPage(res, {
//     title: 'Space Portfolio - Onnes Cryogenics',
//     description: 'Cryogenics involves the production, storage, and transportation of materials at ultra-low temperatures—often below -160°C. From liquefied natural gas (LNG) to space applications.',
//     imageUrl: `${BASE_URL}/images/underwater1.webp`,
//     url: `${BASE_URL}/spaceportfolio`
//   });
// });

// // 5) /ai-simulation
// app.get('/ai-simulation', (req, res) => {
//   sendMetaPage(res, {
//     title: 'AI Simulation - Onnes Cryogenics',
//     description: 'Cryogenic Fluid Management (CFM) refers to technologies designed to store, transfer, and measure ultra-cold fluids such as liquid hydrogen, oxygen, and methane.',
//     imageUrl: `${BASE_URL}/images/cfg.webp`,
//     url: `${BASE_URL}/ai-simulation`
//   });
// });

// // --------- End of Rich Preview Routes ---------

// /// Serve React static files
// app.use(express.static(path.join(__dirname, '../../build')));

// // Fallback to React app for any unmatched routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../build/index.html'));
// });


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
