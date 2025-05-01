import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { pageTitle } from "../../helper";
import Div from "../Div";
import PageHeading from "../PageHeading";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import axios from "axios"; // Import axios for making API requests

export default function ContactPage() {
  pageTitle("Contact Us");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(""); // For success or error messages

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the contact data object
    const contactData = {
      fullName,
      email,
      product,
      mobile,
      message,
    };

    try {
      // Send POST request to backend
      await axios.post("http://localhost:5000/api/admin-contact", contactData);
      setStatus("Message sent successfully!");
      // Optionally, clear the form after successful submission
      setFullName("");
      setEmail("");
      setProduct("");
      setMobile("");
      setMessage("");
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    }
  };

  return (
    <>
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
            <form onSubmit={handleSubmit} className="row">
              <Div className="col-sm-6">
                <label className="cs-primary_color">Full Name*</label>
                <input
                  type="text"
                  className="cs-form_field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Email*</label>
                <input
                  type="text"
                  className="cs-form_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Spacing lg="20" md="20" />
              </Div>
              <div className="col-sm-6">
                <label className="cs-primary_color">Product Category</label>
                <select
                  className="cs-form_field"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  <option value="">Select Project Type</option>
                  <option value="SPACE">SPACE</option>
                  <option value="DEFENCE">DEFENCE</option>
                  <option value="GROUND">GROUND</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
                <Spacing lg="20" md="20" />
              </div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Mobile*</label>
                <input
                  type="text"
                  className="cs-form_field"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                ></textarea>
                <Spacing lg="25" md="25" />
              </Div>
              <Div className="col-sm-12">
                <button className="cs-btn cs-style1">
                  <span>Send Message</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
            </form>
            {status && <div className="mt-3">{status}</div>} {/* Display success/error message */}
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />

      {/* Embedded Google Map with T-Hub Location */}
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
