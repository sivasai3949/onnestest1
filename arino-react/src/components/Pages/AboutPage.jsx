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
  { title: "Spin-off products", factNumber: "50" },
];

export default function AboutPage() {
  pageTitle("About");

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

    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Page Heading */}
      <PageHeading
  title="About Us"
  bgSrc="images/about_hero_bg.jpeg"
  overlayImage="images/aboutusbanner.png"  // Add your overlay image path
  pageLinkText="About Us"
/>


      {/* About Us Section */}
{/* About Us Section */}
<Spacing lg="150" md="80" />
      <Div className="container" id="about-us">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <h1>ABOUT US</h1>
            <Spacing lg="30" md="20" />
            <p className="cs-m0">
  Onnes Cryogenics was formed in Hyderabad, India by physicists
  <span className="nowrap"> Dr. Ram Aluru</span>, who specialises in cryogenics, and
  <span className="nowrap"> Dr. Vikram Srinivasa Raghavan</span>, whose expertise is in composite engineering and nanophysics. The founding team’s experience spans across industries such as space, defence, cryogenics and high pressure gases with a perfect blend for cryogenic composites.
</p>
<p>
  Inspired by India's space and atomic energy journey with phenomenal contributions from physicists
  <span className="nowrap"> Dr. Vikram Sarabhai</span> and
  <span className="nowrap"> Dr. Homi J Bhabha</span>, the team at Onnes are committed to innovating next-generation storage technologies integrated with bespoke cryogenic systems.
</p>

            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
            <Spacing lg="65" md="40" />
          </Div>

          <Div className="col-lg-5 offset-xl-2 d-flex align-items-center">
            <img
              src="/images/aboutus_2.png"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>

        <Div className="row">
          <Div className="col-lg-7">
            <img
              src="/images/aboutus_1.jpg"
              alt="About"
              className="w-100 cs-radius_15"
              style={{ marginTop: "20px" }}
            />
          </Div>
          <Div className="col-lg-5">
            <img
              src="/images/vikramsarabhai1.jpg"
              alt="About"
              className="w-100 cs-radius_15"
            />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />

      {/* Fun Fact Section */}
<Div className="container">
  <FunFact
    title="Our fun fact"
    subtitle={
      <>
        Cryogenics deals with the production, storage, and use of materials at very low temperatures, typically below{" "}
        <span style={{ whiteSpace: "nowrap" }}>120 Kelvin (K)</span> or -150°C. The word originates from the Greek words "kryos" meaning "frost" and{" "}
        <span style={{ whiteSpace: "nowrap" }}>"genic" meaning "to produce."</span>
      </>
    }
    data={funfaceData}
  />
</Div>


      {/* Why Onnes Section */}
      <Spacing lg="100" md="80" />
      <Div className="container" id="why-onnes">
        <Div className="row d-flex align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <img
                  src="/images/whyonnes.jpg"
                  alt="About"
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>

          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <h2>Why Onnes</h2>
            <p className="cs-m0">
              For Space, defence, ground OEMs seeking lighter fuel storage
              options for cryogenic liquids and high pressure gases, ONNES
              offers Carbon Fiber Composite Cryogenic Fuel Tanks that are
              lighter, thinner, and safer than traditional metallic tanks.
            </p>
            <Spacing lg="15" md="15" />
            <p className="cs-m0">
              Onnes tanks and cooling systems enable greener fuels such as
              Hydrogen and CBG across the storage and transportation ecosystem.
              With commercial R&D infused into the product DNA, we push
              boundaries of material science, delivering high-precision and
              customizable cryogenic systems at scale.
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
            <Spacing lg="25" md="0" />
          </Div>
        </Div>
      </Div>

      {/* Vision & Mission Section */}
      <Spacing lg="150" md="80" />
      <Div className="container" id="vision-mission">
        {/* Vision */}
        <Div className="row d-flex align-items-start">
          <Div className="col-lg-6" style={{ marginTop: "100px" }}>
            <img
              src="/images/onnesvision.png"
              alt="Vision"
              className="w-100 cs-radius_15"
            />
          </Div>
          <Div className="col-lg-6">
            <h2>Onnes Vision</h2>
            <Spacing lg="20" md="15" />
            <ul className="cs-m0 vision-list">
              <li>
                <strong>
                  Leading Cryogenic Innovations for Space Exploration
                </strong>{" "}
                to become the global leader in designing and testing cryogenic
                fuel systems, enabling reliable in-orbit refueling and
                sustainable space infrastructure beyond Earth’s orbit.
              </li>
              <li>
                <strong>
                  Develop and Promote Dual Usage Cryogenic Tank Technologies
                </strong>{" "}
                in space conditions which can be used for both civilians and
                niche applications benefiting the society
              </li>
              <li>
                <strong>
                  Transforming Ground Facilities into Space-Test Realities
                </strong>{" "}
                to establish the most advanced ground-based simulation
                facilities that precisely replicate space conditions, driving
                innovation in fuel storage, transfer, and thermal management
                technologies.
              </li>
              <li>
                <strong>
                  Empowering the Future of Space and Ground Sustainability
                </strong>{" "}
                To revolutionize space and ground exploration with reusable,
                energy-efficient, and environmentally friendly cryogenic systems
                that support long-term human and robotic missions in GEO and
                deep space
              </li>
              <li>
                <strong>
                  Building Partnerships for a Propellant-Rich Space Economy
                </strong>{" "}
                to collaborate with space agencies, private launch companies,
                and research organizations to pioneer scalable fuel station
                technologies that power the next era of interplanetary missions.
              </li>
              <li>
                <strong>Accelerate Space Exploration</strong> Support the vision
                of long-term human presence and activity in space by ensuring
                efficient and reliable cryogenic fuel management for spacecraft
                and space stations.
              </li>
            </ul>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg" />
          </Div>
        </Div>

        {/* Activities Full Image */}
        <Spacing lg="60" md="40" />
        <Div className="row">
          <Div className="col-12">
            <img
              src="/images/activities.png"
              alt="Full Width"
              className="w-100 cs-radius_15"
            />
          </Div>
        </Div>

        {/* Mission */}
        <Spacing lg="60" md="40" />
        <Div className="row d-flex align-items-center">
          <Div className="col-lg-6">
            <h2>Onnes Mission</h2>
            <Spacing lg="20" md="15" />
            <ul className="cs-m0 vision-list">
              <li>
                <strong>Revolutionize Space Propulsion Infrastructure</strong>{" "}
                Develop cutting-edge cryogenic fuel storage and testing
                solutions for the growing needs of in-orbit refueling and fuel
                stations in GEO and beyond.
              </li>
              <li>
                <strong>Innovate with Ground-Breaking Technologies</strong>{" "}
                Leverage advanced composites, nanotechnology, and AI-driven
                analytics to design and test cryogenic fuel systems that
                withstand the extreme conditions of space.
              </li>
              <li>
                <strong>Pioneer Ground-Space Testing Synergy</strong> Build
                state-of-the-art ground facilities that replicate space
                conditions for thermal, fluid, structural, and dynamic
                simulations, enabling reliable fuel storage and transfer
                solutions.
              </li>
              <li>
                <strong>Commit to Engineering Excellence</strong> Utilize
                precision engineering, computational simulations, and
                experimental validation to enhance the performance, durability,
                and safety of cryogenic tanks and systems.
              </li>
              <li>
                <strong>Collaborate with the Space Ecosystem</strong> Partner
                with private launch companies, government space agencies, and
                research organizations to drive advancements in cryogenic and
                propellant technologies.
              </li>
              <li>
                <strong>Promote Sustainability in Space Operations</strong>{" "}
                Develop reusable, scalable, and efficient fuel systems that
                minimize energy consumption and material waste for a greener
                space future.
              </li>
            </ul>
          </Div>
          <Div className="col-lg-6 d-flex align-items-center">
            <img
              src="/images/onnesmission.jpeg"
              alt="Mission"
              className="w-100 cs-radius_15"
              style={{ marginLeft: "40px" }}
            />
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
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}
