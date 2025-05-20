const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load meta tag data
const metaTags = require('./metaTags');

// Load environment variables
dotenv.config();

// Trust proxy for IP handling in production
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

// API Routes
const contactRoutes = require('../Backend/Admin/routes/contactRoutes');
const adminAuthRoutes = require('../Backend/Admin/routes/adminAuthRoutes');
const subscriptionRoutes = require('../Backend/Admin/routes/subscriptionRoutes');
const visitorRoutes = require('../Backend/Admin/routes/VisitorRoute');

app.use('/api/admin-contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin-subscribe', subscriptionRoutes);
app.use('/api/admin-visitors', visitorRoutes);

// Serve static frontend files
const CLIENT_BUILD_PATH = path.join(__dirname, '../build');
app.use(express.static(CLIENT_BUILD_PATH));

// Bot User-Agent patterns
const botUserAgents = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandex/i,
  /sogou/i,
  /exabot/i,
  /facebot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /embedly/i,
  /pinterest/i,
  /quora link preview/i,
  /slackbot/i,
  /vkShare/i,
  /W3C_Validator/i,
];

// Meta tag injection for crawlers only
const previewRoutes = ['/', '/about', '/team', '/technology', '/spaceportfolio', '/ai-simulation'];

if (fs.existsSync(CLIENT_BUILD_PATH) && fs.existsSync(path.join(CLIENT_BUILD_PATH, 'index.html'))) {
  previewRoutes.forEach((route) => {
    app.get(route, (req, res) => {
      const userAgent = req.headers['user-agent'] || '';
      const isBot = botUserAgents.some(botRegex => botRegex.test(userAgent));
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

        return res.send(htmlData); // Send unmodified index.html to users
      });
    });
  });
}

// Catch-all route for other frontend paths
app.get('*', (req, res) => {
  const indexPath = path.join(CLIENT_BUILD_PATH, 'index.html');

  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('index.html not found in build folder');
      return res.status(404).send('index.html not found');
    }

    res.sendFile(indexPath);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
