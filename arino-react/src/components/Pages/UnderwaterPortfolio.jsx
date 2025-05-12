import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import FunFact from "../FunFact";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Spacing from "../Spacing";
import SectionHeading from "../SectionHeading";
import Button from "../Button";

const funfaceData = [
  { title: "Global Happy Clients", factNumber: "20" },
  { title: "Project Completed", factNumber: "12" },
  { title: "Team Members", factNumber: "15" },
  { title: "Spin-off\u00a0products", factNumber: "50" },
];

const spaceProject = {
  id: "1",
  title: "Tank Integrated Systems Underwater",
  subtitle: "Cryogenics for Ocean Tech",
  img: "/images/underwater1.webp",
  category: "Gases, Cryogens",
  tankType: "Type-3 and Type-4 tanks",
  relevantSegments: "Underwater Storage & Transportation",
  operatingPressures: "Customized to the need",
};

export default function SpacePortfolio() {
  pageTitle("Space Portfolio");

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return (
    <>
      {/* Page Heading Section */}
      <PageHeading
        title="UNDER WATER APPLICATIONS"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="Under water applications"
      />

      <Spacing lg="80" md="40" />

      {/* Project Image - Center aligned */}
      <Div className="container text-center">
        <img
          src={spaceProject.img}
          alt={spaceProject.title}
          className="cs-radius_15 w-100"
        />
      </Div>
      <Spacing lg="75" md="55" />

      {/* Project Details */}
      <Div className="container">
        <Spacing lg="90" md="40" />
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title={spaceProject.title}
              subtitle={spaceProject.subtitle}
            >
              <Spacing lg="40" md="20" />
              <div className="underwater-description">
                <p>
                  <strong>
                    The Critical Role of Carbon Fiber Pressure Vessels in
                    High-Endurance Underwater Autonomous Vehicles.
                  </strong>
                </p>
                <p>
                  Carbon fiber pressure vessels are revolutionizing the design
                  and operational efficiency of high-endurance autonomous
                  underwater vehicles (AUVs). These vessels serve as integral
                  components, significantly enhancing performance through
                  several key advantages:
                </p>
                <p>
                  <strong>Lightweight Structural Integrity</strong>
                </p>
                <ul>
                  <li>
                    <strong>Low Weight-to-Strength Ratio:</strong> Carbon fiber
                    composites offer exceptional mechanical strength while being
                    substantially lighter than traditional materials such as
                    titanium or steel. This directly translates to extended
                    mission durations due to reduced energy consumption and
                    increased payload capacity.
                  </li>
                  <li>
                    <strong>Improved Buoyancy Control:</strong> The low density
                    of carbon fiber allows better buoyancy balance, minimizing
                    the need for additional ballast or compensatory mechanisms.
                  </li>
                </ul>
                <p>
                  <strong>Efficient Storage of High-Pressure Gases</strong>
                </p>
                <ul>
                  <li>
                    <strong>Compressed Gas Storage:</strong> Carbon fiber
                    vessels are ideal for storing high-pressure gases (e.g.,
                    oxygen, helium, or compressed air) critical for life support
                    systems or buoyancy control. Their high tensile strength
                    ensures safety and reliability at great depths.
                  </li>
                  <li>
                    <strong>Structural Resilience:</strong> These vessels
                    maintain integrity under cyclic pressure loading, common in
                    deep-sea operations.
                  </li>
                </ul>
              </div>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg="60" md="40" />
            <h2 className="cs-font_30 cs-font_26_sm cs-m0">
              Project Specifications
            </h2>
            <Spacing lg="50" md="30" />
            <Div className="row">
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                  Category:
                </h3>
                <p className="cs-m0">{spaceProject.category}</p>
                <Spacing lg="30" md="30" />
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                  Type of Tanks:
                </h3>
                <p className="cs-m0">{spaceProject.tankType}</p>
                <Spacing lg="30" md="30" />
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                  Relevant Segments:
                </h3>
                <p className="cs-m0">{spaceProject.relevantSegments}</p>
                <Spacing lg="30" md="30" />
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                  Operating Pressures:
                </h3>
                <p className="cs-m0">{spaceProject.operatingPressures}</p>
                <Spacing lg="30" md="30" />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>

      {/* Spacing above second image */}
      <Spacing lg="80" md="40" />

      {/* Project Image */}
      <Div className="container text-center">
        <img
          src="/images/underwater2.webp"
          alt="Underwater Tank"
          className="cs-radius_15"
          style={{ width: "540px", height: "360px", objectFit: "contain" }}
        />
        <div style={{ fontSize: "12px", marginTop: "10px" }}>
          <p>
            a) Tank Integrated Cryogenic Systems Play an Integral Role in AUV’s
          </p>
        </div>
      </Div>

      <Spacing lg="90" md="40" />
      <Div className="container">
        <SectionHeading
          title=""
          subtitle="Cryogenic Liquid Compatibility"
        >
          {/* Removed extra spacing here */}
          <div className="underwater-description">
            <ul>
              <li>
                <strong>Insulated Storage:</strong> Carbon fiber composites are
                compatible with the storage of cryogenic liquids (e.g., liquid
                oxygen or liquid hydrogen), thanks to their thermal insulation
                properties and resistance to extreme cold.
              </li>
              <li>
                <strong>Minimal Boil-Off Loss:</strong> Superior insulation
                reduces thermal ingress, minimizing boil-off and preserving
                energy density for longer missions.
              </li>
            </ul>
            <p>
              <strong>Superior Thermal Management</strong>
            </p>
            <ul>
              <li>
                <strong>Thermal Stability:</strong> Carbon fiber materials
                exhibit low thermal conductivity, helping to insulate sensitive
                internal components from external temperature gradients.
              </li>
              <li>
                <strong>Reduced Thermal Expansion:</strong> The dimensional
                stability of carbon fiber prevents micro-leaks or deformations,
                crucial for maintaining pressure integrity in variable thermal
                environments.
              </li>
            </ul>
            <p>
              Carbon fiber pressure vessels are pivotal in enabling the next
              generation of underwater autonomous systems, allowing longer
              missions, deeper dives, and more robust performance. Their
              unmatched combination of light weight, high-pressure tolerance,
              and efficient thermal properties positions them as a core enabler
              of advanced maritime robotics and surveillance platforms.
            </p>
          </div>
        </SectionHeading>
      </Div>

      {/* CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let's discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Contact Us"
          btnLink="/contact"
          bgSrc="about_img_1.jpeg"
        />
      </Div>

      {/* Updated Bullet Styles */}
      <style jsx>{`
        .underwater-description ul {
          list-style: none;
          padding-left: 1.2em;
          color: #fff;
        }

        .underwater-description ul li {
          position: relative;
          padding-left: 1.5em;
          margin-bottom: 0.8em;
        }

        .underwater-description ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 0.6em;
          height: 0.6em;
          background-color: #00b5F9;
          border-radius: 50%;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
    </>
  );
}
