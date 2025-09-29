const express = require('express');
const path = require('path');
const router = express.Router();
const Contact = require('../models/Contact');
const sendMail = require('../utils/mailer');

// In-memory store to track recent submissions (use Redis in production)
const recentSubmissions = new Set();

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
  console.log("📧 POST /contact route called at:", new Date().toISOString());

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

    // Send emails - with flag to prevent multiple sends
    let emailsSent = false;

    if (!emailsSent) {
      try {
        const subject = `Onnes-New Enquiry from ${fullName}`;
        const htmlContent = `
  <h3>You have a new contact message</h3>
  <p><b>Name:</b> ${fullName}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Mobile:</b> ${mobile}</p>
  <p><b>Product:</b> ${product}</p>
  <p><b>Message:</b> ${message}</p>
  <p><b>Submission Time:</b> ${new Date().toISOString()}</p>
  <br/>
  <p style="text-align:left; margin-top:20px;">
    <img src="cid:companyLogo" alt="Onnes Cryogenics Logo" style="width:160px; height:auto;"/>
  </p>
`;

        // Path to your logo inside utils folder
        const logoPath = path.join(__dirname, "../utils/onnes-logo.jpg");

        // Recipients array
        const recipients = [
          process.env.TEST_EMAIL_1,
          process.env.TEST_EMAIL_2,
        ].filter(email => email); // Remove undefined/null emails

        console.log(`📤 Sending emails to ${recipients.length} recipients...`);

        // Send email to each recipient individually with delay
        for (let i = 0; i < recipients.length; i++) {
          const recipient = recipients[i];

          // Add small delay between emails to prevent rate limiting
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          await sendMail(recipient, subject, htmlContent, [
            {
              filename: "onnes-logo.jpg",
              path: logoPath,
              cid: "companyLogo", // Must match "cid:companyLogo" in htmlContent
            }
          ]);

          console.log(`✅ Email ${i + 1}/${recipients.length} sent to ${recipient}`);
        }

        emailsSent = true;
        console.log("🎉 All emails sent successfully!");

      } catch (mailError) {
        console.error("❌ Error sending emails:", mailError);
        // Don't throw error - still return success for saved contact
      }
    }

    // Always return success response with proper status
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
