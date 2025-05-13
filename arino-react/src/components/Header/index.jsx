import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import "./header.scss";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import Div from "../Div";
import DropDown from "./DropDown";
import logos from "../../../src/logos/OnnesLogo.png";

export default function Header({ variant }) {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ used to navigate to "/"
  const [isSticky, setIsSticky] = useState(false);
  const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);

  // Sticky header effect
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  // Scroll to sections on /technology?focus=space
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const focus = params.get("focus");

    if (location.pathname === "/technology" && focus === "space") {
      const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // Scroll to cryogenics first, then thermal
      scrollTo("cryogenics");
      setTimeout(() => scrollTo("thermal"), 600);
    }
  }, [location]);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 text-uppercase ${
          variant ? variant : ""
        } cs-sticky_header ${isSticky ? "cs-sticky_header_active" : ""}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              <Div className="cs-main_header_left">
                <Link className="cs-site_branding" to="/">
                  <img src={logos} alt="Logo" />
                </Link>
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className="cs-nav_list"
                    style={{ display: `${mobileToggle ? "block" : "none"}` }}
                  >
                    <li>
                      <NavLink
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileToggle(false);

                          window.location.href = "/"; // This causes a full page reload
                        }}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="menu-item-has-children">
                      <NavLink
                        to="/about"
                        onClick={() => setMobileToggle(false)}
                      >
                        About
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="/about#about-us"
                              onClick={() => {
                                setMobileToggle(false);
                                setTimeout(() => {
                                  const element =
                                    document.querySelector("#about-us");
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 100);
                              }}
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/about#why-onnes"
                              onClick={() => {
                                setMobileToggle(false);
                                setTimeout(() => {
                                  const element =
                                    document.querySelector("#why-onnes");
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 100);
                              }}
                            >
                              Why Onnes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/about#vision-mission"
                              onClick={() => {
                                setMobileToggle(false);
                                setTimeout(() => {
                                  const element =
                                    document.querySelector("#vision-mission");
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start", // Ensures the section aligns at the top
                                    });
                                  }
                                }, 100);
                              }}
                            >
                              Vision & Mission
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>

                    <li className="menu-item-has-children">
                      <NavLink
                        to="/team"
                        onClick={() => setMobileToggle(false)}
                      >
                        TEAM
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="/team#founders"
                              onClick={() => setMobileToggle(false)}
                            >
                              Founders
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/team#team-members"
                              onClick={() => setMobileToggle(false)}
                            >
                              Team Members
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/#partners"
                              onClick={() => setMobileToggle(false)}
                            >
                              Partners
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>

                    <li className="menu-item-has-children">
                      <NavLink
                        to="/technology#technology"
                        onClick={() => setMobileToggle(false)}
                      >
                        TECHNOLOGY
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="/technology#carbon-fiber"
                              onClick={() => setMobileToggle(false)}
                            >
                              Carbon Fiber Tanks
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/technology#cryogenics"
                              onClick={() => setMobileToggle(false)}
                            >
                              Cryogenics Systems
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/technology#thermal"
                              onClick={() => setMobileToggle(false)}
                            >
                              Thermal Management
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/technology#recycling"
                              onClick={() => setMobileToggle(false)}
                            >
                              Sustainability And Recycling
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>

                    <li className="menu-item-has-children">
                      <NavLink
                        to="spaceportfolio"
                        onClick={() => setMobileToggle(false)}
                      >
                        Portfolio
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            {/* <Link
                              to="portfolio"
                              onClick={() => setMobileToggle(false)}
                            >
                              Product Portfolio
                            </Link> */}
                          </li>
                          <li>
                            <Link
                              to="/spaceportfolio#cryogenics"
                              onClick={() => setMobileToggle(false)}
                            >
                              Space - Aerospace - Defence
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/spaceportfolio#carbon-fiber"
                              onClick={() => setMobileToggle(false)}
                            >
                              Ground Based Storage
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/spaceportfolio#underwater"
                              onClick={() => setMobileToggle(false)}
                            >
                              Under Water Applications
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li className="menu-item-has-children">
                      <NavLink
                        to="/ai-simulation"
                        onClick={() => setMobileToggle(false)}
                      >
                        AI SIMULATION
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="/ai-simulation#cfm"
                              onClick={() => setMobileToggle(false)}
                            >
                              CFM
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/ai-simulation#quantum-cfd"
                              onClick={() => setMobileToggle(false)}
                            >
                              Quantum CFD
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              to="/ai-simulation#new-materials"
                              onClick={() => setMobileToggle(false)}
                            >
                              New Materials
                            </Link>
                          </li> */}
                        </ul>
                      </DropDown>
                    </li>

                    <li className="menu-item-has-children">
                      <Link to="/" onClick={() => setMobileToggle(false)}>
                        MORE
                      </Link>
                      <DropDown>
                        <ul>
                          {/* <li>
                            <Link
                              to="upcoming-events"
                              onClick={() => setMobileToggle(false)}
                            >
                              Upcoming Events
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              to="blog"
                              onClick={() => setMobileToggle(false)}
                            >
                              Blog & News
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/contact#contact-form"
                              onClick={() => setMobileToggle(false)}
                            >
                              Contact
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/team/#founders"
                              onClick={() => setMobileToggle(false)}
                            >
                              Founders
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              to="case-study-details"
                              onClick={() => setMobileToggle(false)}
                            >
                              Case Study Details
                            </Link>
                          </li> */}
                        </ul>
                      </DropDown>
                    </li>
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? "cs-munu_toggle cs-toggle_active"
                        : "cs-munu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </Div>
              </Div>
              <Div className="cs-main_header_right">
                <Div className="cs-toolbox">
                  <span
                    className="cs-icon_btn"
                    onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                  >
                    <span className="cs-icon_btn_in">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

      <Div
        className={
          sideHeaderToggle ? "cs-side_header active" : "cs-side_header"
        }
      >
        <button
          className="cs-close"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div
          className="cs-side_header_overlay"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div className="cs-side_header_in">
          <Div className="cs-side_header_shape" />
          <Link className="cs-site_branding" to="/">
            <img src={logos} alt="Logo" />
          </Link>
          <Div className="cs-side_header_box">
            <h2 className="cs-side_header_heading">
              Do you have a project in your <br /> mind? Keep connect us.
            </h2>
          </Div>
          <Div className="cs-side_header_box">
            <ContactInfoWidget title="Contact Us" withIcon />
          </Div>
          <Div className="cs-side_header_box">
            <Newsletter
              title="Subscribe"
              subtitle="Subscribe to our newsletters to get the latest news and updates"
              placeholder="example@gmail.com"
            />
          </Div>
          <Div className="cs-side_header_box">
            <SocialWidget />
          </Div>
        </Div>
      </Div>
    </>
  );
}
