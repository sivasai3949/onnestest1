import React, { useEffect, useState } from "react";
import "./Popup.scss";
import { Link } from "react-router-dom";
import logos from "../../../src/logos/OnnesLogo.png";
import Div from "../Div";

export default function Popup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup after 3s
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    // Hide popup after 11s (3s wait + 8s visible)
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Close button */}
        <button className="popup-close" onClick={() => setShow(false)}>
          ×
        </button>

        <Div className="cs-side_header_in">
          <Div className="cs-side_header_shape" />

          {/* Logo */}
          <Div
            className="cs-side_header_box"
            style={{ textAlign: "center", marginBottom: "15px" }}
          >
            <Link className="cs-site_branding" to="/">
              <img
                src={logos}
                alt="Logo"
                style={{ maxWidth: "160px", margin: "0 auto" }}
              />
            </Link>
          </Div>

          {/* Heading */}
          <Div className="cs-side_header_box">
            <h2
              className="cs-side_header_heading"
              style={{
                textAlign: "center",
                fontSize: "26px",
                marginBottom: "20px",
              }}
            >
              Do you have a project in <br /> mind?
            </h2>
          </Div>

          {/* Reach Us Section */}
          <Div className="cs-side_header_box" style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Reach us at
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <Link
                to="/contact#contact-form"
                style={{
                  color: "#00aced", // highlight color
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                info@onnes.in
              </Link>
            </p>
          </Div>
        </Div>
      </div>
    </div>
  );
}
