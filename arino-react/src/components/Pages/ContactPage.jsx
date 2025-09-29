import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { pageTitle } from "../../helper";
import Div from "../Div";
import PageHeading from "../PageHeading";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  pageTitle("Contact Us");

  const formRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll to contact form if URL contains #contact-form
    if (location.hash === "#contact-form" && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100); // slight delay to ensure DOM is ready
    }
  }, [location]);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error
  
  // Submission prevention state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("📝 Form submission attempted at:", new Date().toISOString());
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("⚠️ Already submitting, preventing duplicate...");
      return;
    }

    // Prevent rapid successive submissions (within 5 seconds)
    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
      setStatus("Please wait a moment before submitting again.");
      setStatusType("error");
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 3000);
      return;
    }

    // Validate required fields
    if (!fullName.trim() || !email.trim() || !product || !mobile.trim() || !message.trim()) {
      setStatus("Please fill in all required fields.");
      setStatusType("error");
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 3000);
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      setStatus("Please enter a valid 10-digit mobile number.");
      setStatusType("error");
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(now);
    setStatus("Sending message...");
    setStatusType("sending");

    const contactData = {
      fullName: fullName.trim(),
      email: email.trim(),
      product,
      mobile: mobile.trim(),
      message: message.trim(),
    };

    try {
      console.log("📤 Sending contact form data:", { ...contactData, message: contactData.message.substring(0, 50) + "..." });
      
      const response = await axios.post("/api/admin-contact", contactData, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("✅ Form submitted successfully:", response.data);
      
      setStatus("Message sent successfully! We'll get back to you soon.");
      setStatusType("success");
      
      // Reset form fields on success
      setFullName("");
      setEmail("");
      setProduct("");
      setMobile("");
      setMessage("");
      
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      
      let errorMessage = "Error sending message. Please try again.";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your connection and try again.";
      }
      
      setStatus(errorMessage);
      setStatusType("error");
    } finally {
      // Re-enable submission after 3 seconds minimum
      setTimeout(() => {
        setIsSubmitting(false);
        console.log("🔓 Form re-enabled for submission");
      }, 3000);
    }

    // Clear status message after 8 seconds
    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 8000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Onnes | Space, Defence & Cryogenic Solutions</title>
        <meta
          name="description"
          content="Get in touch with Onnes for innovative solutions in space, defence, ground-based and cryogenic technologies. Contact us via form, email, or visit our office at T-Hub Hyderabad."
        />
        <meta
          name="keywords"
          content="Contact Onnes, Onnes India, Cryogenic Technology, Space Simulation, Defence Projects, Aerospace, T-Hub Hyderabad"
        />
        <link rel="canonical" href="https://onnes.in/contact" />
      </Helmet>

      <PageHeading
        title="Contact Us"
        bgSrc="/images/contact_hero_bg.jpeg"
        pageLinkText="Contact"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title="Do you have a project <br/>in your mind?"
              subtitle="Getting Touch"
            />
            <Spacing lg="55" md="30" />
            <ContactInfoWidget withIcon />
            <Spacing lg="0" md="50" />
          </Div>
          <Div className="col-lg-6">
            <form
              id="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="row"
            >
              <Div className="col-sm-6">
                <label className="cs-primary_color">Full Name*</label>
                <input
                  type="text"
                  className="cs-form_field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Email*</label>
                <input
                  type="email"
                  className="cs-form_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Project Type*</label>
                <select
                  className="cs-form_field bg-black text-white border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 rounded"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  disabled={isSubmitting}
                  required
                >
                  <option className="bg-black text-white">
                    Select Project Type
                  </option>
                  <option className="bg-black text-white hover:bg-blue-500">
                    SPACE
                  </option>
                  <option className="bg-black text-white hover:bg-blue-500">
                    DEFENCE
                  </option>
                  <option className="bg-black text-white hover:bg-blue-500">
                    GROUND
                  </option>
                  <option className="bg-black text-white hover:bg-blue-500">
                    OTHERS
                  </option>
                </select>
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Mobile*</label>
                <input
                  type="text"
                  className="cs-form_field"
                  value={mobile}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) setMobile(input);
                  }}
                  disabled={isSubmitting}
                  required
                  maxLength="10"
                  placeholder="Enter 10-digit mobile number"
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-12">
                <label className="cs-primary_color">Message*</label>
                <textarea
                  cols="30"
                  rows="7"
                  className="cs-form_field"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  required
                ></textarea>
                <Spacing lg="25" md="25" />
              </Div>
              <Div className="col-sm-12">
                <button 
                  type="submit" 
                  className={`cs-btn cs-style1 ${isSubmitting ? 'cs-btn-disabled' : ''}`}
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
              {status && (
                <Div className="col-sm-12 mt-3">
                  <p
                    className="font-semibold"
                    style={{
                      color: 
                        statusType === "success" ? "#00B5F9ff" : 
                        statusType === "sending" ? "#00B5F9ff" : 
                        "red",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {statusType === 'success' && (
                      <Icon 
                        icon="bi:check-circle-fill" 
                        style={{ color: "#00B5F9ff" }}
                      />
                    )}
                    {statusType === 'error' && (
                      <Icon 
                        icon="bi:exclamation-triangle-fill" 
                        style={{ color: "red" }}
                      />
                    )}
                    {status}
                  </p>
                </Div>
              )}
            </form>
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      <div className="cs-google_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5387246675623!2d78.3762381736905!3d17.43391080146618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93bd18410b0f%3A0x8d7e3fea891858ce!2sT-Hub!5e0!3m2!1sen!2sin!4v1745926796929!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="T-Hub Hyderabad"
        ></iframe>
      </div>
      <Spacing lg="50" md="40" />
    </>
  );
}
