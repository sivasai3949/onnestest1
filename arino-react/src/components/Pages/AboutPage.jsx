import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import FunFact from '../FunFact';
import PageHeading from '../PageHeading';
import Div from '../Div';
import Spacing from '../Spacing';
import './AboutPage.css';

const funfaceData = [
  { title: 'Global Happy Clients', factNumber: '40K' },
  { title: 'Project Completed', factNumber: '50K' },
  { title: 'Team Members', factNumber: '245' },
  { title: 'Digital products', factNumber: '550' },
];

export default function AboutPage() {
  pageTitle('About');

  useEffect(() => {
    // Handle scroll to section when URL hash changes
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Scroll to section on component mount
    handleScroll();

    // Event listener to handle hash change
    window.addEventListener('hashchange', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="About Us"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="About Us"
      />
      {/* End Page Heading Section */}

      {/* Start About Us Section */}
      <Spacing lg="150" md="80" />
      <Div className="container" id="about-us">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <h1>ABOUT US</h1>
            <Spacing lg="30" md="20" />
            <p className="cs-m0">
            Onnes Cryogenics was formed in Hyderabad, India by physicists Dr. Ram Aluru, who specialises in cryogenics, and Dr. Vikram Srinivasa Raghavan, whose expertise is in composite engineering and nanophysics. The founding team’s experience spans across industries such as space, defence, cryogenics and high pressure gases with a perfect blend for cryogenic composites. Inspired by the generation of great physicists who propelled new innovations across the cosmos to serve society in an impactful manner.
            </p>
            <Spacing lg="15" md="15" />
            <p>Inspired by India's space and atomic energy journey with phenomenal contributions coming from physicists Dr. Vikram Sarabhai and Dr. Homi J Bhabha who are bestowed with a rare combination of a scientist - innovator - industrialist and a visionary, the team at Onnes are committed to innovate next generation storage technologies integrated with bespoke cryogenic systems. </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg"></Div>
            <Spacing lg="25" md="40" />
          </Div>

          <Div className="col-lg-5 offset-xl-2 d-flex align-items-center">
            <img
              src="/images/aboutus_2.png"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>

          <Div className="col-lg-7">
            <img
              src="/images/aboutus_1.jpg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>

          <Div className="col-lg-5">
            <img
              src="/images/vikramsarabhai1.jpg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />
      {/* End About Us Section */}

      {/* Start Fun Fact Section */}
      <Div className="container">
        <FunFact
          title="Our fun fact"
          subtitle="Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
          data={funfaceData}
        />
      </Div>
      {/* End Fun Fact Section */}

      {/* Start Why Onnes Section */}
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
            {/* <Spacing lg="30" md="20" /> */}
            <p className="cs-m0">
            For Space, defence, ground  OEMs seeking lighter fuel storage options for cryogenic liquids and high pressure gases, ONNES offers Carbon Fiber Composite Cryogenic Fuel Tanks integrated with cryogenic systems that are lighter, thinner, and safer than traditional metallic tanks. ONNES tanks maintain exceptional strength while enabling efficient cooling and mid-space refueling, transforming long-distance space travel with unmatched efficiency and performance. 
            </p>
            <Spacing lg="15" md="15" />
            <p className="cs-m0">
            On the ground segments, Onnes Tanks and cooling systems will play pivotal roles in enabling greener fuels such as Hydrogen, CBG across the storage and transportation ecosystem contributing to significant decarbonization and net zero emissions goal. At Onnes, commercial R&D is injected into the product DNA to push the boundaries of material science and engineering limitations suiting the needs of rugged applications. With our unique expertise, we have a niche ability to customize the tanks and cryogenic systems for clients needs and produce them in volume with precision consistency, reproducibility and reliability.
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg"></Div>
            <Spacing lg="25" md="0" />
          </Div>
        </Div>
      </Div>
      {/* End Why Onnes Section */}

      {/* Start Vision & mission Section */}
<Spacing lg="150" md="80" />
<Div className="container" id="about-us">
  {/* Vision Section - Image Left, Text Right */}
  <Div className="row d-flex align-items-start">
    {/* Image on Left */}
    <Div className="col-lg-6">
      <img
        src="/images/onnesvision.png"
        alt="Vision"
        className="w-100 cs-radius_15"
      />
    </Div>
    {/* Text on Right */}
    <Div className="col-lg-6">
      {/* Removed top spacing here to align with image */}
      <h2>Onnes Vision</h2>
      <Spacing lg="20" md="15" />
      <ul className="cs-m0 vision-list">
  <li>
    <strong>Leading Cryogenic Innovations for Space Exploration</strong> to become the global leader in designing and testing cryogenic fuel systems, enabling reliable in-orbit refueling and sustainable space infrastructure beyond Earth’s orbit.
  </li>
  <li>
    <strong>Develop and Promote Dual Usage Cryogenic Tank Technologies</strong> in space conditions which can be used for both civilians and niche applications benefiting the society  

  </li>
  <li>
    <strong>Transforming Ground Facilities into Space-Test Realities</strong> to establish the most advanced ground-based simulation facilities that precisely replicate space conditions, driving innovation in fuel storage, transfer, and thermal management technologies.
  </li>
  <li>
    <strong>Empowering the Future of Space and Ground Sustainability</strong> To revolutionize space and ground exploration with reusable, energy-efficient, and environmentally friendly cryogenic systems that support long-term human and robotic missions in GEO and deep space 
  </li>
  <li>
    <strong>Building Partnerships for a Propellant-Rich Space Economy</strong> to collaborate with space agencies, private launch companies, and research organizations to pioneer scalable fuel station technologies that power the next era of interplanetary missions.
  </li>
  <li>
    <strong>Accelerate Space Exploration</strong> Support the vision of long-term human presence and activity in space by ensuring efficient and reliable cryogenic fuel management for spacecraft and space stations.
  </li>
</ul>
      <Spacing lg="30" md="30" />
      <Div className="cs-separator cs-accent_bg"></Div>
    </Div>
  </Div>

  {/* Full-width Image */}
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

  {/* Mission Section - Text Left, Image Right */}
  <Spacing lg="60" md="40" />
  <Div className="row d-flex align-items-center">
    {/* Text on Left */}
    <Div className="col-lg-6">
      <h2>Onnes Mission</h2>
      <Spacing lg="20" md="15" />
      <ul className="cs-m0 vision-list">
  <li>
    <strong>Revolutionize Space Propulsion Infrastructure</strong> Develop cutting-edge cryogenic fuel storage and testing solutions for the growing needs of in-orbit refueling and fuel stations in GEO and beyond.
  </li>
  <li>
    <strong>Innovate with Ground-Breaking Technologies</strong> Leverage advanced composites, nanotechnology, and AI-driven analytics to design and test cryogenic fuel systems that withstand the extreme conditions of space.
  </li>
  <li>
    <strong>Pioneer Ground-Space Testing Synergy</strong> Build state-of-the-art ground facilities that replicate space conditions for thermal, fluid, structural, and dynamic simulations, enabling reliable fuel storage and transfer solutions.
  </li>
  <li>
    <strong>Commit to Engineering Excellence</strong> Utilize precision engineering, computational simulations, and experimental validation to enhance the performance, durability, and safety of cryogenic tanks and systems.
  </li>
  <li>
    <strong>Collaborate with the Space Ecosystem</strong> Partner with private launch companies, government space agencies, and research organizations to drive advancements in cryogenic and propellant technologies.
  </li>
  <li>
    <strong>Promote Sustainability in Space Operations</strong> Develop reusable, scalable, and efficient fuel systems that minimize energy consumption and material waste for a greener space future.
  </li>
</ul>
    </Div>

    {/* Image on Right */}
    <Div className="col-lg-6">
      <img
        src="/images/onnesmission.jpeg"
        alt="Mission"
        className="w-100 cs-radius_15"
      />
    </Div>
  </Div>
</Div>
{/* End Vision & mission Section */}


      {/* Start CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
