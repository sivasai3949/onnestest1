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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      fullName,
      email,
      product,
      mobile,
      message,
    };

    try {
      await axios.post("/api/admin-contact", contactData);
      setStatus("Message sent successfully!");
      setStatusType("success");
      setFullName("");
      setEmail("");
      setProduct("");
      setMobile("");
      setMessage("");
    } catch (error) {
      setStatus("Error sending message. Please try again.");
      setStatusType("error");
    }

    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 5000);
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
                  required
                ></textarea>
                <Spacing lg="25" md="25" />
              </Div>
              <Div className="col-sm-12">
                <button type="submit" className="cs-btn cs-style1">
                  <span>Send Message</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
              {status && (
                <Div className="col-sm-12 mt-3">
                  <p
                    className="font-semibold"
                    style={{
                      color: statusType === "success" ? "#00B5F9ff" : "red",
                    }}
                  >
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
