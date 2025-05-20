const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

dotenv.config();
app.set('trust proxy', true);

const metaTags = require('./metaTags');

app.use(cors({
  origin: ['http://localhost:3000', 'https://onnes.in', 'https://www.onnes.in'],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/admin-contact', require('../Backend/Admin/routes/contactRoutes'));
app.use('/api/admin', require('../Backend/Admin/routes/adminAuthRoutes'));
app.use('/api/admin-subscribe', require('../Backend/Admin/routes/subscriptionRoutes'));
app.use('/api/admin-visitors', require('../Backend/Admin/routes/VisitorRoute'));

// Serve static frontend build
const CLIENT_BUILD_PATH = path.join(__dirname, '../build');
app.use(express.static(CLIENT_BUILD_PATH));

// Bot detection patterns
const botUserAgents = [
  /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i, /baiduspider/i,
  /yandex/i, /sogou/i, /exabot/i, /facebot/i, /facebookexternalhit/i,
  /twitterbot/i, /linkedinbot/i, /embedly/i, /pinterest/i,
  /quora link preview/i, /slackbot/i, /vkShare/i, /W3C_Validator/i,
];

const previewRoutes = ['/', '/about', '/team', '/technology', '/spaceportfolio', '/ai-simulation'];

previewRoutes.forEach((route) => {
  app.get(route, (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isBot = botUserAgents.some(regex => regex.test(userAgent));
    const meta = metaTags[route];
    const indexPath = path.join(CLIENT_BUILD_PATH, 'index.html');

    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
      if (err) return res.status(500).send('Error loading index.html');

      if (meta && isBot) {
        const finalHtml = htmlData
          .replace(/<title>(.*?)<\/title>/, `<title>${meta.title}</title>`)
          .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${meta.description}">`)
          .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${meta.title}">`)
          .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${meta.description}">`)
          .replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${meta.image}">`)
          .replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${meta.title}">`)
          .replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${meta.description}">`)
          .replace(/<meta name="twitter:image" content=".*?">/, `<meta name="twitter:image" content="${meta.image}">`);

        return res.send(finalHtml);
      }

      return res.send(htmlData); // For non-bots
    });
  });
});

// Fallback for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
