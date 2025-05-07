import React, { useState } from "react";
import axios from "axios";
import Div from "../Div";

export default function Newsletter({ title, subtitle, placeholder }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email.");
      setIsSuccess(false);
      return;
    }

    try {
      // Make the API request to save the email
      const res = await axios.post("/api/admin-subscribe", { email });

      if (res.status === 201) {
        setMessage("Subscription successful!");
        setIsSuccess(true);
        setEmail(""); // Clear the input field
      }
    } catch (err) {
      setMessage("Error subscribing. Please try again later.");
      setIsSuccess(false);
      console.error(err);
    }
  };

  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <Div className="cs-newsletter cs-style1">
        <form onSubmit={handleSubscribe} className="cs-newsletter_form">
          <input
            type="email"
            className="cs-newsletter_input"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="cs-newsletter_btn">
            <span>Send</span>
          </button>
        </form>
        <Div className="cs-newsletter_text">{subtitle}</Div>
        {message && (
          <div
            className="cs-message"
            style={{ color: isSuccess ? "#00B5F9ff" : "red" }}
          >
            {message}
          </div>
        )}
      </Div>
    </>
  );
}
