import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import FunFact from "../FunFact";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Spacing from "../Spacing";
import "./AboutPage.css";

const funfaceData = [
  { title: "Global Happy Clients", factNumber: "20" },
  { title: "Project Completed", factNumber: "12" },
  { title: "Team Members", factNumber: "15" },
  { title: "Spinoff products", factNumber: "50" },
];

export default function AboutPage() {
  // Set page title dynamically
  pageTitle("AI Simulation | Onnes Cryogenics");

  useEffect(() => {
    // Function to handle smooth scroll to the section
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Trigger scroll on initial load
    handleScroll();
    
    // Event listener to handle hash change
    window.addEventListener("hashchange", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Page Heading */}
      <PageHeading
        title="AI SIMULATION"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="AI SIMULATION"
      />

      {/* CFM Section */}
      <Spacing lg="150" md="80" />
      <Div className="container" id="cfm">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <h1>CFM</h1>
            <Spacing lg="30" md="20" />
            <p className="cs-m0">
              AI Simulation CFM is a cutting-edge integration of Artificial
              Intelligence with Computational Fluid Mechanics. This advanced
              technology enhances the simulation of fluid flow through
              data-driven algorithms...
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
            <Spacing lg="65" md="40" />
          </Div>
          <Div className="col-lg-5 offset-xl-2 d-flex align-items-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />

      {/* Quantum CFD Section */}
      <Spacing lg="100" md="80" />
      <Div className="container" id="quantum-cfd">
        <Div className="row d-flex align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Quantum CFD"
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <h2>QUANTUM CFD</h2>
            <p className="cs-m0">
              Quantum CFD (Computational Fluid Dynamics) is an emerging field
              that explores the application of quantum computing to fluid flow
              simulations...
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
            <Spacing lg="25" md="0" />
          </Div>
        </Div>
      </Div>

      {/* New Materials Section */}
      <Spacing lg="150" md="80" />
      <Div className="container" id="new-materials">
        <Div className="row d-flex align-items-start">
          <Div className="col-lg-6" style={{ marginTop: "100px" }}>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Vision"
              className="w-100 cs-radius_15"
            />
          </Div>
          <Div className="col-lg-6">
            <h2>NEW MATERIALS</h2>
            <Spacing lg="20" md="15" />
            <p className="cs-m0">
              Quantum CFD (Computational Fluid Dynamics) is an emerging field
              that explores the application of quantum computing...
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
          </Div>
        </Div>
      </Div>

      {/* CTA */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Contact Us"
          btnLink="/contact"
          bgSrc="https://via.placeholder.com/1200x600"
        />
      </Div>
    </>
  );
}
