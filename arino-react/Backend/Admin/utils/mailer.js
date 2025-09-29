require('dotenv').config();

const nodemailer = require("nodemailer");

// Create transporter with connection pooling
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  pool: true, // Enable connection pooling
  maxConnections: 3, // Limit concurrent connections
  maxMessages: 100, // Limit messages per connection
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: false, // Disable in production
  debug: false,  // Disable in production
});

// Test connection once
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Transporter verification failed:", err);
  } else {
    console.log("✅ Transporter is ready to send emails");
  }
});

async function sendMail(to, subject, htmlContent, attachments = []) {
  try {
    console.log(`📧 Sending email to: ${to}`);
    
    const info = await transporter.sendMail({
      from: `"Onnes Contact" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments, // ✅ Added attachments support
    });
    
    console.log(`✅ Email sent successfully to ${to} - MessageID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    throw error;
  }
}

module.exports = sendMail;
