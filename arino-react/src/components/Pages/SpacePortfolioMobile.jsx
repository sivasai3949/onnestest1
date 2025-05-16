import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Spacing from "../Spacing";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import { useLocation } from "react-router-dom";
import './spaceportfolio.css'

const funfaceData = [
  { title: "Global Happy Clients", factNumber: "20" },
  { title: "Project Completed", factNumber: "12" },
  { title: "Team Members", factNumber: "15" },
  { title: "Spin-off products", factNumber: "50" },
];

const spaceProjects = [
  {
    id: "2",
    title: "Fuel Tanks with Cryogenics Systems",
    subtitle: "Deep Space Exploration",
    img: "/images/Home_8.webp",
    category: "Cryogenic Liquids (LoX, LH2)",
    TypeofTanks: "Type 3 and Type 4 ",
    RelevantSegments: "Space, Ground, Defence",
    OperatingPressures: "from 2 bar onwards",
    client: "SpaceX",
    description: [
      "Cryogenics involves the production, storage, and transportation of materials at ultra-low temperatures—often below -160°C. From liquefied natural gas (LNG) systems to superconducting applications, cryogenic environments demand materials engineered for extreme cold, high performance, and long-term stability.",
      "Specialized composites maintain strength, dimensional stability, and electrical insulation even in frigid conditions—making them ideal for structural supports, insulators, valve components, and other critical parts in cryogenic systems. Onnes expertise lies in building composite pressure vessels for storing cryogenic liquid fuels such as liquid oxygen and liquid hydrogen fuels through innovative advanced cryogenic carbon fiber composites for space applications. The storage of cryogenic fuels in carbon fiber pressure vessels is emerging as an area for energy efficient storage as they offer potential weight savings relative to the existing metal tanks or composite overwrapped metal tankss.",
    ],
    fullImageCaption: "e) Type-4 and Type-5 composite tanks for space fuels storage (liquid oxygen and liquid hydrogen etc.,)",
  },
  {
    id: "3",
    title: "Thermal Management",
    subtitle: "Engineered Cryocoolers",
    img: "/images/thermal_management1.webp",
    category: "High Pressure Gases",
    TypeofTanks: "Type-3 and Type-4 tanks",
    RelevantSegments: "Space, Ground, Defence",
    OperatingPressures: "From 10 bar onwards",
    client: "SpaceX",
    description: [
      "Cryogenic cooling is considered the ultimate mode of thermal management for electronic systems. Achieved through cryocoolers, these systems are used in specialty electronics such as aerospace, military, space, medical equipment, and high-speed, high-capacity computing.",
      "A cryocooler is a mechanical refrigerator designed to cool applications down to cryogenic temperatures. These are typically below around 123 K, which equals -150°C or -238°F.",
      "In this temperature range, many physical phenomena begin to change significantly compared to room temperature, and new effects become increasingly important.",
      "The field of cryogenics involves unique disciplines, operational constraints, and testing methodologies specific to low temperatures.",
      "A key area is the development of cryogenic refrigerators called cryocoolers. Applications range from hospital MRI machines, to space telescopes, to night-vision scopes used on military battlefields.",
      "Cryogenic refrigeration is achieved through different types of cryocoolers. Depending on the end application, cryocoolers are classified as Stirling, Gifford-McMahon (G-M), Joule-Thomson (J-T) and Pulse Tube Cryocoolers. Onnes constantly innovates to push the technological limits of cryocoolers to make them suited for the macroscopic and miniature applications on ground, space and water by integrating them into our composite tank technology. ",
    ],
  },
  {
    id: "1",
    title: "Next Generation Carbon Fiber Pressure Vessel Technology",
    subtitle: "Composite and Polymer Engineering",
    img: "/images/carbonfibertanks.webp",
    category: "High Pressure Gases",
    TypeofTanks: "Type-3 and Type-4 tanks ",
    RelevantSegments: "Space, Ground, Defence",
    OperatingPressures: "Starting from 200 bar onwards",
    description: [
      "Carbon Fibre Reinforced Plastic (CFRP) tanks represent a cutting-edge solution for gas and cryogens storage, addressing crucial challenges in the clean energy sector. These cylinders are engineered with lightweight, high-strength carbon fibre materials, making them exceptionally durable and efficient. Their unique design, with continuous filament winding blended with resins and nanofillers, ensures superior structural integrity, enabling them to withstand extreme pressures and harsh environments. The key advantage of carbon fibre filament-wound cylinders lies in their ability to store hydrogen at high pressures, maximizing storage capacity while minimizing weight. This makes them ideal for various applications, including fuel cell vehicles and renewable energy storage systems. By enabling safe and efficient hydrogen storage, these cylinders play a pivotal role in advancing the use of hydrogen as a clean, sustainable energy source, contributing to a greener future.",
    ],
  },
];

const underwaterProject = {
  id: "4",
  title: "Tank Integrated Systems Underwater",
  subtitle: "Cryogenics for Ocean Tech",
  img: "/images/underwater1.webp",
  category: "Gases, Cryogens",
  TypeofTanks: "Type-3 and Type-4 tanks",
  RelevantSegments: "Underwater Storage & Transportation",
  OperatingPressures: "Customized to the need",
};

const sectionHeadings = [
  "CRYOGENICS SYSTEMS",
  "THERMAL MANAGEMENT",
  "CARBON FIBER TANKS",
];
const sectionIds = ["cryogenics", "thermal", "carbon-fiber"];

export default function SpacePortfolioMobile() {
  const location = useLocation();
  pageTitle("Space Portfolio");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location]);

  return (
    <>
      <PageHeading
        title="SPACE-AEROSPACE-DEFENCE"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="SPACE-AEROSPACE-DEFENCE"
        id="technology"
      />

      {spaceProjects.map((project, idx) => (
        <React.Fragment key={project.id}>
          <Spacing lg="50" md="30" />
          
          {/* Section Heading - Simplified for mobile */}
          <Div className="container" id={sectionIds[idx]}>
            <h2 className="cs-page_title cs-center cs-font_30 cs-m0">
              {sectionHeadings[idx]}
            </h2>
          </Div>

          <Spacing lg="20" md="15" />
          
          {/* Project Image - Full width on mobile */}
          <Div className="container">
            <img
              src={project.img}
              alt={project.title}
              className="cs-radius_15 w-100"
              style={{ maxHeight: '250px', objectFit: 'cover' }}
            />
            {project.id === "2" && (
              <p className="cs-center mt-2 cs-font_12">
                e) Type-4 and Type-5 composite tanks for space fuels storage
              </p>
            )}
          </Div>

          <Spacing lg="40" md="30" />

          {/* Project Details - Stacked vertically on mobile */}
          <Div className="container">
            <Div className="row">
              <Div className="col-12">
                <SectionHeading
                  title={project.title}
                  subtitle={project.subtitle}
                  variant="mobile"
                >
                  <Spacing lg="20" md="15" />
                  {project.description.map((text, index) => (
                    <p key={index} className="cs-font_14">
                      {text}
                    </p>
                  ))}
                </SectionHeading>
              </Div>
              
              {/* Project Specifications - Simplified for mobile */}
              <Div className="col-12">
                <Div className="cs-mobile-specs cs-radius_15">
                  <h3 className="cs-font_20 cs-m0">Project Specifications</h3>
                  <Spacing lg="15" md="10" />
                  
                  <Div className="cs-specs-grid">
                    <Div className="cs-spec-item">
                      <h4 className="cs-accent_color cs-font_16">Category:</h4>
                      <p className="cs-m0 cs-font_14">{project.category}</p>
                    </Div>
                    
                    <Div className="cs-spec-item">
                      <h4 className="cs-accent_color cs-font_16">Type of Tanks:</h4>
                      <p className="cs-m0 cs-font_14">{project.TypeofTanks}</p>
                    </Div>
                    
                    <Div className="cs-spec-item">
                      <h4 className="cs-accent_color cs-font_16">Relevant Segments:</h4>
                      <p className="cs-m0 cs-font_14">{project.RelevantSegments}</p>
                    </Div>
                    
                    <Div className="cs-spec-item">
                      <h4 className="cs-accent_color cs-font_16">Operating Pressures:</h4>
                      <p className="cs-m0 cs-font_14">{project.OperatingPressures}</p>
                    </Div>
                  </Div>
                </Div>
              </Div>
            </Div>

            {/* Mobile-optimized image grids */}
           {project.id === "1" && (
  <>
    <Spacing lg="30" md="20" />
    <Div className="row g-0">
      <Div className="col-12 mb-3">
        <img
          src="/images/2ltype3.webp"
          alt="2L Type 3 Tanks"
          className="w-100 cs-radius_15"
        />
        <p className="cs-center mt-1" style={{ fontSize: '14px', lineHeight: '1.3' }}>
          a) 2 L Composite tanks for space applications
        </p>
      </Div>
      <Div className="col-6 pe-1">
        <img
          src="/images/2l4setstype3.webp"
          alt="5L Type 3 Tanks"
          className="w-100 cs-radius_15"
        />
        <p className="cs-center mt-1" style={{ fontSize: '14px', lineHeight: '1.3' }}>
          b) 5 L Composite tanks for<br />Drone and UAV applications
        </p>
      </Div>
      <Div className="col-6 ps-1">
        <img
          src="/images/20ltype3.webp"
          alt="20L Type 3 Tanks"
          className="w-100 cs-radius_15"
        />
        <p className="cs-center mt-1" style={{ fontSize: '14px', lineHeight: '1.3' }}>
         c) 20 L Composite tanks for<br />CBG and Hydrogen Storage
        </p>
      </Div>
    </Div>
    <Spacing lg="30" md="20" />
    <img
      src="/images/carbonfibertank2.webp"
      alt="Carbon Fiber Tanks"
      className="w-100 cs-radius_15 mb-3"
    />
    <p className="cs-center" style={{ fontSize: '14px', lineHeight: '1.3' }}>
      d) Cascade of Composite Tanks for CBG, Hydrogen and Cryogenic Storage
    </p>
  </>
)}
            {/* Cryocooler Variants for Thermal Management */}
           {project.id === "3" && (
  <>
    <Spacing lg="30" md="20" />
    <Div className="container">
      <h3 className="cs-font_26 cs-m0 cs-center">Cryocooler Variants</h3>
      <Spacing lg="30" md="20" />
      <Div className="row">
        {['1', '2', '3', '4'].map((num) => (
          <Div key={num} className="col-6 mb-4">
            <div className="cs-radius_15" style={{ height: '200px', overflow: 'hidden' }}>
              <img
                src={`/images/Cryocooler${num}.webp`}
                alt={`Cryocooler${num}`}
                className="w-100 h-100"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="cs-center mt-2 cs-m0" style={{ fontSize: '14px' }}>
              {num === '1' && 'a) Stirling Cryocooler'}
              {num === '2' && 'b) Gifford-McMahon Cryocooler'}
              {num === '3' && 'c) Joule-Thomson Cryocooler'}
              {num === '4' && 'd) Pulse Tube Cryocooler'}
            </p>
          </Div>
        ))}
      </Div>
    </Div>
  </>
)}

            {/* Simplified navigation for mobile */}
            <Spacing lg="40" md="30" />
            <Div className="cs-page_navigation cs-center-mobile">
                          <Div>
                            {idx !== 0 && (
                              <Button 
                                btnLink={`#${sectionIds[idx-1]}`} 
                                btnText='Previous' 
                                variant='cs-type1'
                              />
                            )}
                          </Div>
                          <Div>
                            {idx !== spaceProjects.length - 1 && (
                              <Button 
                                btnLink={`#${sectionIds[idx+1]}`} 
                                btnText='Next'
                              />
                            )}
                          </Div>
                        </Div>
                      </Div>
                    </React.Fragment>
                  ))}

      {/* Underwater Section - Mobile optimized */}
      <Spacing lg="50" md="30" />
      <Div className="container" id="underwater">
        <h2 className="cs-center cs-font_26 cs-m0">UNDER WATER APPLICATIONS</h2>
        <Spacing lg="20" md="15" />
        <img
          src={underwaterProject.img}
          alt={underwaterProject.title}
          className="cs-radius_15 w-100"
          style={{ maxHeight: '250px', objectFit: 'cover' }}
        />
        
        <Spacing lg="40" md="30" />
        <Div className="row">
          <Div className="col-12">
            <SectionHeading
              title={underwaterProject.title}
              subtitle={underwaterProject.subtitle}
              variant="mobile"
            >
              <Spacing lg="20" md="15" />
              <div className="underwater-description">
                <p className="cs-font_14">
                  <strong>
                    The Critical Role of Carbon Fiber Pressure Vessels in
                    High-Endurance Underwater Autonomous Vehicles.
                  </strong>
                </p>
                <p className="cs-font_14">
                  Carbon fiber pressure vessels are revolutionizing the design
                  and operational efficiency of high-endurance autonomous
                  underwater vehicles (AUVs). These vessels serve as integral
                  components, significantly enhancing performance through
                  several key advantages:
                </p>
                <p className="cs-font_14">
                  <strong>Lightweight Structural Integrity</strong>
                </p>
                <ul>
                  <li className="cs-font_14">
                    <strong>Low Weight-to-Strength Ratio:</strong> Carbon fiber
                    composites offer exceptional mechanical strength while being
                    substantially lighter than traditional materials such as
                    titanium or steel. This directly translates to extended
                    mission durations due to reduced energy consumption and
                    increased payload capacity.
                  </li>
                  <li className="cs-font_14">
                    <strong>Improved Buoyancy Control:</strong> The low density
                    of carbon fiber allows better buoyancy balance, minimizing
                    the need for additional ballast or compensatory mechanisms.
                  </li>
                </ul>
              </div>
            </SectionHeading>
          </Div>
          
          <Div className="col-12">
            <Div className="cs-mobile-specs cs-radius_15">
              <h3 className="cs-font_20 cs-m0">Project Specifications</h3>
              <Spacing lg="15" md="10" />
              
              <Div className="cs-specs-grid">
                <Div className="cs-spec-item">
                  <h4 className="cs-accent_color cs-font_16">Category:</h4>
                  <p className="cs-m0 cs-font_14">{underwaterProject.category}</p>
                </Div>
                
                <Div className="cs-spec-item">
                  <h4 className="cs-accent_color cs-font_16">Type of Tanks:</h4>
                  <p className="cs-m0 cs-font_14">{underwaterProject.TypeofTanks}</p>
                </Div>
                
                <Div className="cs-spec-item">
                  <h4 className="cs-accent_color cs-font_16">Relevant Segments:</h4>
                  <p className="cs-m0 cs-font_14">{underwaterProject.RelevantSegments}</p>
                </Div>
                
                <Div className="cs-spec-item">
                  <h4 className="cs-accent_color cs-font_16">Operating Pressures:</h4>
                  <p className="cs-m0 cs-font_14">{underwaterProject.OperatingPressures}</p>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>

        <Spacing lg="30" md="20" />
        <Div className="container text-center">
          <img
            src="/images/underwater2.webp"
            alt="Underwater Tank"
            className="cs-radius_15"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="cs-font_12 mt-2">
            <p>
              a) Tank Integrated Cryogenic Systems Play an Integral Role in AUV's
            </p>
          </div>
        </Div>

        <Spacing lg="40" md="30" />
        <SectionHeading title="" subtitle="Cryogenic Liquid Compatibility">
          <div className="underwater-description">
            <ul>
              <li className="cs-font_14">
                <strong>Insulated Storage:</strong> Carbon fiber composites are
                compatible with the storage of cryogenic liquids (e.g., liquid
                oxygen or liquid hydrogen), thanks to their thermal insulation
                properties and resistance to extreme cold.
              </li>
              <li className="cs-font_14">
                <strong>Minimal Boil-Off Loss:</strong> Superior insulation
                reduces thermal ingress, minimizing boil-off and preserving
                energy density for longer missions.
              </li>
            </ul>
            <p className="cs-font_14">
              <strong>Superior Thermal Management</strong>
            </p>
            <ul>
              <li className="cs-font_14">
                <strong>Thermal Stability:</strong> Carbon fiber materials
                exhibit low thermal conductivity, helping to insulate sensitive
                internal components from external temperature gradients.
              </li>
              <li className="cs-font_14">
                <strong>Reduced Thermal Expansion:</strong> The dimensional
                stability of carbon fiber prevents micro-leaks or deformations,
                crucial for maintaining pressure integrity in variable thermal
                environments.
              </li>
            </ul>
            <p className="cs-font_14">
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

      <Spacing lg="80" md="40" />
      <Div className="container">
        <Cta
          title="Let's discuss to make ultra cool and light tanks"
          btnText="Contact Us"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
          variant="mobile"
        />
      </Div>
    </>
  );
}