const express = require('express');
const path = require('path');
const router = express.Router();
const Contact = require('../models/Contact');
const sendMail = require('../utils/mailer');

// In-memory store to track recent submissions (use Redis in production)
const recentSubmissions = new Set();

// Simple HTML escape helper
function escapeHTML(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Helper to format current time in IST
function getISTTime() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }) + " (IST)";
}

// GET - Fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contact messages.", error });
  }
});

// POST - Save a new contact message and send to multiple emails individually
router.post('/', async (req, res) => {
  console.log("📧 POST /contact route called at:", getISTTime());

  try {
    const { fullName, email, product, mobile, message } = req.body;

    // Create unique submission identifier
    const submissionId = `${email}-${mobile}-${Date.now()}`;
    const duplicateKey = `${email}-${mobile}-${message.substring(0, 50)}`;

    // Check for duplicate submission within last 5 minutes
    if (recentSubmissions.has(duplicateKey)) {
      console.log("⚠️ Duplicate submission detected, skipping...");
      return res.status(200).json({
        message: "Contact message already received recently!"
      });
    }

    // Add to recent submissions (expires after 5 minutes)
    recentSubmissions.add(duplicateKey);
    setTimeout(() => {
      recentSubmissions.delete(duplicateKey);
    }, 5 * 60 * 1000); // 5 minutes

    // Save contact message to database
    const newContact = new Contact({
      fullName,
      email,
      product,
      mobile,
      message,
    });

    await newContact.save();
    console.log("✅ Contact message saved successfully!");

    // Send emails
    let emailsSent = false;

    if (!emailsSent) {
      try {
        const subject = `Onnes - New Enquiry from ${fullName}`;
        const submissionTime = getISTTime();

        // Escape and safely format message for HTML email
        const escapedMessage = escapeHTML(message)
          .replace(/(.{100})/g, "$1<br/>"); // soft wrap long lines

        const htmlContent = `
          <h3>You have a new contact message</h3>
          <p><b>Name:</b> ${escapeHTML(fullName)}</p>
          <p><b>Email:</b> ${escapeHTML(email)}</p>
          <p><b>Mobile:</b> ${escapeHTML(mobile)}</p>
          <p><b>Product:</b> ${escapeHTML(product)}</p>
          <p><b>Message:</b></p>
          <pre style="white-space:pre-wrap;word-break:break-word;
              background:#f9f9f9;padding:10px;border-radius:8px;">
${escapedMessage}
          </pre>
          <p><b>Submission Time:</b> ${submissionTime}</p>
          <br/>
          <p style="text-align:left; margin-top:20px;">
            <img src="cid:companyLogo" alt="Onnes Cryogenics Logo" style="width:160px; height:auto;"/>
          </p>
        `;

        // Plain text version (guaranteed delivery even if HTML fails)
        const plainText = `
New contact message received:

Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Product: ${product}

Message:
${message}

Submission Time: ${submissionTime}
        `;

        // Path to your logo inside utils folder
        const logoPath = path.join(__dirname, "../utils/onnes-logo.jpg");

        // Recipients array
        const recipients = [
          process.env.TEST_EMAIL_1,
          process.env.TEST_EMAIL_2,
        ].filter(email => email);

        console.log(`📤 Sending emails to ${recipients.length} recipients...`);

        // Send email to each recipient individually with delay
        for (let i = 0; i < recipients.length; i++) {
          const recipient = recipients[i];

          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          await sendMail(
            recipient,
            subject,
            htmlContent,
            [
              {
                filename: "onnes-logo.jpg",
                path: logoPath,
                cid: "companyLogo",
              }
            ],
            plainText
          );

          console.log(`✅ Email ${i + 1}/${recipients.length} sent to ${recipient}`);
        }

        emailsSent = true;
        console.log("🎉 All emails sent successfully!");
      } catch (mailError) {
        console.error("❌ Error sending emails:", mailError);
      }
    }

    return res.status(201).json({
      message: "Contact message saved successfully!",
      submissionId: submissionId
    });

  } catch (error) {
    console.error("❌ Error in contact route:", error);
    return res.status(500).json({
      message: "Error saving contact message.",
      error: error.message
    });
  }
});

// GET - Count of contact messages
router.get('/count', async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("❌ Error fetching contact count:", err);
    res.status(500).json({ message: 'Error fetching contact count' });
  }
});

module.exports = router;
