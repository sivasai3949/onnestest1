 import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Spacing from "../Spacing";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import { useLocation } from "react-router-dom"; // <-- ADD THIS

const funfaceData = [
  { title: "Global Happy Clients", factNumber: "20" },
  { title: "Project Completed", factNumber: "12" },
  { title: "Team Members", factNumber: "15" },
  { title: "Spin-off products", factNumber: "50" },
];

const spaceProjects = [
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
  // {
  //   id: "2",
  //   title: "Fuel Tanks with Cryogenics Systems",
  //   subtitle: "Deep Space Exploration",
  //   img: "/images/Home_8.webp",
  //   category: "Cryogenic Liquids (LoX, LH2)",
  //   TypeofTanks: "Type 3 and Type 4 ",
  //   RelevantSegments: "Space, Ground, Defence",
  //   OperatingPressures: "from 2 bar onwards",
  //   client: "SpaceX",
  //   description: [
  //     "Cryogenics involves the production, storage, and transportation of materials at ultra-low temperatures—often below -160°C. From liquefied natural gas (LNG) systems to superconducting applications, cryogenic environments demand materials engineered for extreme cold, high performance, and long-term stability.",
  //     "Specialized composites maintain strength, dimensional stability, and electrical insulation even in frigid conditions—making them ideal for structural supports, insulators, valve components, and other critical parts in cryogenic systems. Onnes expertise lies in building composite pressure vessels for storing cryogenic liquid fuels such as liquid oxygen and liquid hydrogen fuels through innovative advanced cryogenic carbon fiber composites for space applications. The storage of cryogenic fuels in carbon fiber pressure vessels is emerging as an area for energy efficient storage as they offer potential weight savings relative to the existing metal tanks or composite overwrapped metal tankss.",
  //   ],
  //   fullImageCaption:
  //     "e) Type-4 and Type-5 composite tanks for space fuels storage (liquid oxygen and liquid hydrogen etc.,)",
  // },
  // {
  //   id: "3",
  //   title: "Thermal Management",
  //   subtitle: "Engineered Cryocoolers",
  //   img: "/images/thermal_management1.webp",
  //   category: "High Pressure Gases",
  //   TypeofTanks: "Type-3 and Type-4 tanks",
  //   RelevantSegments: "Space, Ground, Defence",
  //   OperatingPressures: "From 10 bar onwards",
  //   client: "SpaceX",
  //   description: [
  //     "Cryogenic cooling is considered the ultimate mode of thermal management for electronic systems. Achieved through cryocoolers, these systems are used in specialty electronics such as aerospace, military, space, medical equipment, and high-speed, high-capacity computing.",
  //     "A cryocooler is a mechanical refrigerator designed to cool applications down to cryogenic temperatures. These are typically below around 123 K, which equals -150°C or -238°F.",
  //     "In this temperature range, many physical phenomena begin to change significantly compared to room temperature, and new effects become increasingly important.",
  //     "The field of cryogenics involves unique disciplines, operational constraints, and testing methodologies specific to low temperatures.",
  //     "A key area is the development of cryogenic refrigerators called cryocoolers. Applications range from hospital MRI machines, to space telescopes, to night-vision scopes used on military battlefields.",
  //     "Cryogenic refrigeration is achieved through different types of cryocoolers. Depending on the end application, cryocoolers are classified as Stirling, Gifford-McMahon (G-M), Joule-Thomson (J-T) and Pulse Tube Cryocoolers. Onnes constantly innovates to push the technological limits of cryocoolers to make them suited for the macroscopic and miniature applications on ground, space and water by integrating them into our composite tank technology. ",
  //   ],
  // },

  // {
  //   id: "4",
  //   title: "Recyclability of Carbon Fiber Tanks",
  //   subtitle: "Sustainability and Recycling",
  //   img: "/images/Carbon-Fiber-Reinforced-Polymer1.webp",
  //   category: "High Pressure Gases",
  //   TypeofTanks: "Type-3 and Type-4 tanks",
  //   RelevantSegments: "Space, Ground, Defence",
  //   OperatingPressures: "From 10 bar onwards",
  //   client: "SpaceX",
  //   description: [
  //     "We are extremely cautious and committed to sustainability and green manufacturing of the tanks and cryogenic systems. Our Type 3 and Type 4 tanks have a significantly reduced environmental impact compared to the manufacturing of traditional Type 1 and Type 2 cylinders.",
  //     "The fully recyclable materials used in the tanks' manufacturing and the composite tanks' exceptional lightness reduce CO2 emissions during mobility applications and play a significant role in the storage and transportation of sustainable gases, liquids, and cryogens for space, aviation, and underwater applications.",
  //     "Onnes Cryogenics' commitment to sustainability is reflected at every stage of the tank and cryogenic systems manufacturing process from the choice of materials to product design—promoting a greener future for the planet and the cosmos.",
  //     "The weight reduction of the tanks directly translates to optimization of transport loads, improving logistics efficiency and reducing fuel consumption.",
  //   ],
  // },
];

const sectionHeadings = [
  "CARBON FIBER TANKS",
  // "CRYOGENICS SYSTEMS",
  // "THERMAL MANAGEMENT",
  // "SUSTAINABILITY AND RECYCLING ",
];
const sectionIds = ["carbon-fiber", "cryogenics", "thermal", "recycling"];

export default function SpacePortfolio() {
  const location = useLocation(); // <-- ADD THIS
  pageTitle("Space Portfolio");

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]); // <-- DEPEND ON locatio

  return (
    <>
      {/* Page Heading Section */}
      <PageHeading
        title="GROUND BASED STORAGE SOLUTIONS"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="GROUND BASED STORAGE"
        id="technology"
      />

      {/* Project Sections */}
      {spaceProjects.map((project, idx) => (
        <React.Fragment key={project.id}>
          <Spacing lg="80" md="40" />
          {/* Section Heading */}
          <Div className="container">
            <h2
              id={sectionIds[idx]}
              className="cs-page_title cs-center cs-font_50 cs-font_30_sm cs-m0"
            >
              {sectionHeadings[idx]}
            </h2>
          </Div>
          <Spacing lg="30" md="20" />
          {/* Project Image */}
          <Div className="container">
            <img
              src={project.img}
              alt={project.title}
              className="cs-radius_15 w-100"
            />

            {/* Show caption only for the Cryogenics Systems project (id === "2") */}
            {project.id === "2" && (
              <p className="cs-center mt-2">
                e)&nbsp;&nbsp;Type-4 and Type-5 composite tanks for space fuels storage
                (liquid oxygen and liquid hydrogen etc.,)
              </p>
            )}
          </Div>

          <Spacing lg="75" md="55" />

          {/* Project Details */}
          <Div className="container">
            <Spacing lg="90" md="40" />
            <Div className="row">
              <Div className="col-lg-6">
                <SectionHeading
                  title={project.title}
                  subtitle={project.subtitle}
                >
                  <Spacing lg="40" md="20" />
                  {project.description.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </SectionHeading>
              </Div>
              {project.id === "2" ? (
                <Div
                  className="col-lg-5 offset-lg-1 d-flex align-items-center"
                  style={{ paddingTop: "180px" }}
                >
                  <Div
                    className="cs-radius_15 position-relative"
                    style={{
                      backgroundImage: `url('/images/cryogenicsystem_projectspeci.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "330px",
                      minWidth: "510px",
                      padding: "40px",
                      borderRadius: "15px",
                      color: "#000",
                      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <h2
                      className="cs-font_30 cs-font_26_sm cs-m0 pt-3"
                      style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)" }}
                    >
                      Project Specifications
                    </h2>
                    <Spacing lg="30" md="20" />
                    <Div className="row">
                      <Div className="col-6">
                        <h3
                          className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0"
                          style={{ textShadow: "1px 1px 4px rgb(0, 0, 0)" }}
                        >
                          Category:
                        </h3>
                        <p
                          className="cs-m0"
                          style={{ textShadow: "1px 1px 4px rgb(0, 0, 0)" }}
                        >
                          {project.category}
                        </p>
                        <Spacing lg="20" md="20" />
                      </Div>
                      <Div className="col-6">
                        <h3
                          className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0"
                          style={{ textShadow: "1px 1px 4px rgb(0, 0, 0)" }}
                        >
                          Type of Tanks:
                        </h3>
                        <p
                          className="cs-m0"
                          style={{ textShadow: "1px 1px 4px rgb(0, 0, 0)" }}
                        >
                          {project.TypeofTanks}
                        </p>
                        <Spacing lg="20" md="20" />
                      </Div>
                      <Div className="row">
                        <Div className="col-6" style={{ paddingRight: "25px" }}>
                          <h3
                            className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0"
                            style={{
                              whiteSpace: "nowrap",
                              textShadow: "1px 1px 4px rgb(0, 0, 0)",
                            }}
                          >
                            Relevant Segments:
                          </h3>
                          <p
                            className="cs-m0"
                            style={{
                              whiteSpace: "nowrap",
                              textShadow: "1px 1px 4px rgb(0, 0, 0)",
                            }}
                          >
                            {project.RelevantSegments}
                          </p>
                        </Div>
                        <Div className="col-6" style={{ paddingLeft: "25px" }}>
                          <h3
                            className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0"
                            style={{
                              whiteSpace: "nowrap",
                              textShadow: "1px 1px 4px rgb(0, 0, 0)",
                            }}
                          >
                            Operating Pressures:
                          </h3>
                          <p
                            className="cs-m0"
                            style={{
                              whiteSpace: "nowrap",
                              textShadow: "1px 1px 4px rgb(0, 0, 0)",
                            }}
                          >
                            {project.OperatingPressures}
                          </p>
                        </Div>
                      </Div>
                    </Div>
                  </Div>
                </Div>
              ) : project.id === "3" ? (
                <Div
                  className="col-lg-5 offset-lg-1 d-flex flex-column justify-content-start align-items-start"
                  style={{ paddingTop: 140 }}
                >
                  <h2 className="cs-font_30 cs-font_26_sm cs-m0">
                    Project Specifications
                  </h2>
                  <Spacing lg="50" md="30" />
                  <Div className="row">
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Category:
                      </h3>
                      <p className="cs-m0">{project.category}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Type of Tanks:
                      </h3>
                      <p className="cs-m0">{project.TypeofTanks}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Relevant Segments:
                      </h3>
                      <p className="cs-m0">{project.RelevantSegments}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Operating Pressures:
                      </h3>
                      <p className="cs-m0">{project.OperatingPressures}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                  </Div>
                  {/* Add your image here */}
                  <img
                    src="/images/thermal_management2.webp"
                    alt="Thermal Management Details"
                    style={{
                      width: "100%",
                      marginTop: "40px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                  />
                </Div>
              ) : project.id === "4" ? (
                <Div
                  className="col-lg-5 offset-lg-1 d-flex flex-column justify-content-center align-items-center"
                  style={{ paddingTop: "100px" }}
                >
                  <img
                    src="/images/recycling_tech_speci.png"
                    alt="Recycling Technology Specifications"
                    className="cs-radius_15"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      objectFit: "contain",
                    }}
                  />
                </Div>
              ) : (
                <Div
                  className="col-lg-5 offset-lg-1 d-flex flex-column justify-content-center"
                  style={{ paddingTop: "140px" }}
                >
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
                      <p className="cs-m0">{project.category}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Type of Tanks:
                      </h3>
                      <p className="cs-m0">{project.TypeofTanks}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Relevant Segments:
                      </h3>
                      <p className="cs-m0">{project.RelevantSegments}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                    <Div className="col-6">
                      <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">
                        Operating Pressures:
                      </h3>
                      <p className="cs-m0">{project.OperatingPressures}</p>
                      <Spacing lg="30" md="30" />
                    </Div>
                  </Div>
                </Div>
              )}
            </Div>
            {project.id === "1" && (
              <>
                <Spacing lg="50" md="30" />
                <Div className="container">
                  <Div
                    className="row"
                    style={{ display: "flex", alignItems: "stretch" }}
                  >
                    <Div className="col-lg-6 mb-4 d-flex flex-column">
                      <Div className="flex-grow-1 d-flex flex-column">
                        <img
                          src="/images/Onnes-2L-Type-3.webp"
                          alt="Description 1"
                          className="w-100 cs-radius_15"
                          style={{ objectFit: "cover", height: "700px" }}
                        />
                        <p className="cs-center mt-2">
                          a)&nbsp;&nbsp;2 L Composite tanks for space
                          applications
                        </p>
                      </Div>
                    </Div>

                    <Div className="col-lg-6 mb-4 d-flex flex-column">
                      <Div
                        className="flex-grow-1 d-flex flex-column mb-3"
                        style={{ flexBasis: "20%" }}
                      >
                        <img
                          src="/images/Onnes-2L-4sets-Type-3.webp"
                          alt="Description 2"
                          className="w-100 cs-radius_15"
                          style={{ objectFit: "cover", height: "300px" }}
                        />
                        <p className="cs-center mt-2">
                          b)&nbsp;&nbsp;5 L Composite tanks for Drone and UAV
                          applications
                        </p>
                      </Div>

                      <Div
                        className="flex-grow-1 d-flex flex-column"
                        style={{ flexBasis: "25%" }}
                      >
                        <img
                          src="/images/Onnes-20L-Type-3.webp"
                          alt="Description 3"
                          className="w-100 cs-radius_15"
                          style={{ objectFit: "cover", height: "330px" }}
                        />
                        <p className="cs-center mt-2">
                          c)&nbsp;&nbsp;20 L Composite tanks for CBG and
                          Hydrogen Storage
                        </p>
                      </Div>
                    </Div>
                  </Div>
                </Div>

                {/* Full-width Image Section */}
                <Spacing lg="50" md="30" />
                <Div className="container-fluid px-0">
                  <img
                    src="/images/carbonfibertank2.webp"
                    alt="Carbon Fiber Tanks"
                    className="w-100  cs-radius_15"
                    style={{ maxHeight: "700px", objectFit: "cover" }}
                  />
                  <p className="cs-center mt-2">
                    d)&nbsp;&nbsp;Cascade of Composite Tanks for CBG, Hydrogen
                    and Cryogenic Storage
                  </p>
                </Div>
              </>
            )}

            <Spacing lg="65" md="10" />
            {project.id === "2" && (
              <Div className="container-fluid px-0">
                <img
                  src="/images/cryogenicsystem2_techpage.jpg"
                  alt="Cryogenic System Full Width"
                  className="w-100 cs-radius_15"
                  style={{ maxHeight: "700px", objectFit: "cover" }}
                />
                <p className="cs-center mt-2">
                  Cryogenic fuel tank integrated with composite system
                </p>
              </Div>
            )}
            {project.id === "3" && (
              <>
                {/* 4 Images Grid */}
                {/* <Spacing lg="50" md="30" /> */}
                <Div className="container">
                  <h3 className="cs-font_30 cs-font_26_sm cs-m0 cs-center">
                    Cryocooler Variants
                  </h3>
                  <Spacing lg="30" md="20" />
                  <Div
                    className="row g-4"
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                    }}
                  >
                    {/* Image 1 */}
                    <Div
                      className="col-lg-3 col-md-6"
                      style={{ flex: "0 0 auto", width: "25%" }}
                    >
                      <img
                        src="/images/Cryocooler-1.webp"
                        alt="Stirling Cryocooler"
                        className="w-100 cs-radius_15"
                        style={{ height: "300px", objectFit: "contain" }}
                      />
                      <p className="cs-center mt-2 cs-m0">
                        a) Stirling Cryocooler
                      </p>
                    </Div>

                    {/* Image 2 */}
                    <Div
                      className="col-lg-3 col-md-6"
                      style={{ flex: "0 0 auto", width: "25%" }}
                    >
                      <img
                        src="/images/Cryocooler-2.webp"
                        alt="Pulse Tube Crycooler"
                        className="w-100 cs-radius_15"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <p className="cs-center mt-2 cs-m0">
                        b) Pulse Tube Crycooler
                      </p>
                    </Div>

                    {/* Image 3 */}
                    <Div
                      className="col-lg-3 col-md-6"
                      style={{ flex: "0 0 auto", width: "25%" }}
                    >
                      <img
                        src="/images/Cryocooler-3.webp"
                        alt="JT Cryocooler"
                        className="w-100 cs-radius_15"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <p className="cs-center mt-2 cs-m0">
                        c) JT Cryocooler
                      </p>
                    </Div>

                    {/* Image 4 */}
                    <Div
                      className="col-lg-3 col-md-6"
                      style={{ flex: "0 0 auto", width: "25%" }}
                    >
                      <img
                        src="/images/Cryocooler-4.webp"
                        alt="GM Crycooler 
"
                        className="w-100 cs-radius_15"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <p className="cs-center mt-2 cs-m0">
                        d) GM Crycooler 

                      </p>
                    </Div>
                  </Div>
                </Div>
              </>
            )}
            <Spacing lg="65" md="10" />

            {/* Navigation Buttons */}
            <Div className="cs-page_navigation cs-center nav-fix-align">
              <Div>
                {idx !== 0 && (
                  <Button
                    btnLink={`#project-${
                      spaceProjects[
                        (idx - 1 + spaceProjects.length) % spaceProjects.length
                      ].id
                    }`}
                    btnText="Previous Project"
                    variant="cs-type1"
                  />
                )}
              </Div>
              <Div>
                {idx !== spaceProjects.length - 1 && (
                  <Button
                    btnLink={`#project-${
                      spaceProjects[(idx + 1) % spaceProjects.length].id
                    }`}
                    btnText="Next Project"
                  />
                )}
              </Div>
            </Div>
          </Div>
        </React.Fragment>
      ))}

      {/* CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let's discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Contact Us"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}