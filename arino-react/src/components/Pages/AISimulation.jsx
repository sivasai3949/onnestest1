import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Spacing from "../Spacing";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import { useLocation } from "react-router-dom";
import "./AISimulation.css";

const spaceProjects = [
  {
    id: "1",
    title: "Cryogenic Fluid Management (CFM)",
    subtitle: "Deep Space Exploration",
    img: "/images/cfg.webp",
    category: "High Pressure Gases",
    TypeofTanks: "Type-3 and Type-4 tanks",
    RelevantSegments: "Space, Ground, Defence",
    OperatingPressures: "Starting from 200 bar onwards",
    description: (
      <div className="ai-description">
        <p className="ai-paragraph">
          <strong>Cryogenic Fluid Management (CFM)</strong> refers to a suite of
          technologies designed to store, transfer, and measure ultra-cold
          fluids such as liquid hydrogen, liquid oxygen, and liquid methane.
          These cryogenic fluids serve as the primary propellants for space
          exploration missions, making CFM technologies essential to future
          endeavors in both exploration and science.
        </p>

        <p className="ai-paragraph">
          To support its long-term vision for space, deep space exploration
          requires high-performance propulsion systems—including chemical,
          electric, and nuclear options. Cryogens will play a critical role in
          these systems, enabling missions ranging from Earth-to-orbit
          transportation to deep space exploration.
        </p>

        <p className="ai-heading">
          <strong>
            CFM integrated tank technologies will be pivotal in supporting:
          </strong>
        </p>
        <ul className="vision-list">
          <li>Human missions to the Moon and Mars</li>
          <li>Robotic planetary exploration</li>
          <li>In-situ resource utilization (ISRU) for propellant production</li>
          <li>
            The development of surface and in-space refueling depots for
            cryogenic propellants
          </li>
        </ul>

        <p className="ai-paragraph">
          Together, these capabilities will ensure the sustainability and
          efficiency of future space missions.
        </p>

        <p className="ai-paragraph">
          One of the major challenges in{" "}
          <strong>cryogenic fluid storage</strong> is the continual loss of
          cryogens over time, caused by their tendency to{" "}
          <strong>boil off at warmer temperatures</strong>. To minimize this
          loss, <strong>multilayer insulation</strong> is used as a passive
          control method. While this helps reduce boil-off for short durations,
          it is not sufficient for long-term storage.
        </p>

        <p className="ai-paragraph">
          To actively prevent heat from reaching the cryogenic propellants,{" "}
          <strong>cryocoolers</strong>
          are employed. These function similarly to refrigerators by removing
          heat, resulting in
          <strong> minimal or zero propellant loss</strong> — a system known as
          a<strong> "zero-boiloff system."</strong>
        </p>

        <p className="ai-heading">
          <strong>
            Zero-boiloff technology offers significant advantages:
          </strong>
        </p>
        <ul className="vision-list">
          <li>Eliminates the need for oversized tanks</li>
          <li>Reduces the amount of extra propellant required</li>
          <li>
            Minimizes launch vehicle mass by decreasing the propellant load
          </li>
        </ul>

        <p className="ai-paragraph">
          Every kilogram of propellant saved allows for more payload capacity —
          critical for deep space missions.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    title: "Quantum AI CFD Cryogenic Fluid Management",
    subtitle: "Quantum Computation Fluid Dynamics",
    img: "/images/quantum-cfd.webp",
    category: "Cryogenic Liquids (LoX, LH2)",
    TypeofTanks: "Type 3 and Type 4",
    RelevantSegments: "Space, Ground, Defence",
    OperatingPressures: "from 2 bar onwards",
    client: "SpaceX",
    description: (
      <div className="ai-description">
        <p className="ai-paragraph">
          Quantum AI Computational Fluid Dynamics play a key role in modelling
          fluid dynamics, heat transfers and multi physics material phenomena
          which is critical for the development of tank technologies that
          contain cryogenic liquids in extreme space conditions.
        </p>
        <strong>
          Advancing Cryogenic Fluid Management for Future Space Missions
        </strong>
        <p className="ai-paragraph">
          A significant advancement beyond the current state of the art in fluid
          management is essential to make cryogenic propellants viable for use
          in high-performance nuclear thermal and chemical propulsion systems.
          These systems are critical for future long-duration space exploration
          missions.
        </p>
        <p>
          To achieve this advancement, Onnes is focusing on{" "}
          <strong>Zero Boil-Off (ZBO)</strong> and{" "}
          <strong>Reduced Boil-Off (RBO)</strong> strategies. Unlike current
          short-duration, gravity-insensitive, passive pressure control systems,
          ZBO and RBO rely on<strong>active operations</strong> to ensure
          reliable, cost-effective, and efficient storage and transfer of
          cryogenic propellants with <strong>minimal fuel loss.</strong>.
        </p>
        <p>
          These advanced strategies involve a{" "}
          <strong>
            complex combination of dynamic forced mixing and energy removal{" "}
          </strong>{" "}
          in a two-phase, multi-component propellant system. The goal is to
          control tank temperature and pressure throughout various storage and
          transfer operations.
        </p>
        <p>
          A future large-scale{" "}
          <strong>Cryogenic Fluid Management (CFM) Demonstration</strong> for
          in-space refueling will aim to test these operations. These may
          involve{" "}
          <strong>either segregated or interpenetrated fluid phases,</strong>{" "}
          which can be composed of single or multiple condensable and
          non-condensable species.
        </p>
      </div>
    ),
    fullImageCaption:
      "e) Type-4 and Type-5 composite tanks for space fuels storage (liquid oxygen and liquid hydrogen etc.,)",
  },
];

const sectionHeadings = ["CFM", "QUANTUM CFD"];
const sectionIds = ["cfm", "quantum-cfd"];

export default function AISimulation() {
  const location = useLocation();
  pageTitle("AI Simulation");

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <PageHeading
        title="AI SIMULATION"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="AI Simulation"
        id="technology"
      />

      {spaceProjects.map((project, idx) => (
        <React.Fragment key={project.id}>
          <Spacing lg="80" md="40" />
          <Div className="container">
            <h2
              id={sectionIds[idx]}
              className="cs-page_title cs-center cs-font_50 cs-font_30_sm cs-m0"
            >
              {sectionHeadings[idx]}
            </h2>
          </Div>
          <Spacing lg="30" md="20" />

          <Div className="container">
            <img
              src={project.img}
              alt={project.title}
              className="cs-radius_15 w-100"
            />
            {project.id === "2" && <p className="cs-center mt-2"></p>}
          </Div>

          <Spacing lg="75" md="55" />

          <Div className="container">
            <Spacing lg="90" md="40" />
            <Div className="row">
              {project.id === "2" ? (
                <Div className="col-lg-12">
                  <SectionHeading
                    title={project.title}
                    subtitle={project.subtitle}
                  >
                    <Spacing lg="40" md="20" />
                    {project.description}
                  </SectionHeading>

                  {/* Images stacked vertically below the text */}
                  <Spacing lg="40" md="30" />
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="d-flex flex-row justify-content-center flex-wrap"
                      style={{ gap: "40px", width: "100%" }}
                    >
                      <img
                        src="/images/quantum-1.jpg"
                        alt="Quantum CFD 1"
                        className="img-fluid cs-radius_15"
                        style={{ width: "35%", maxWidth: "400px" }}
                      />
                      <img
                        src="/images/quantum-2.jpg"
                        alt="Quantum CFD 2"
                        className="img-fluid cs-radius_15"
                        style={{ width: "35%", maxWidth: "400px" }}
                      />
                    </div>
                    <p className="mt-2 text-center">
                      a)&nbsp;&nbsp;Variation in velocity field in the liquid
                      Hydrogen tank at different (Reference Image)
                    </p>
                  </div>
                  <Spacing lg="40" md="30" />
                  <div className="container">
                    <p className="ai-heading">
                      <strong>
                        The Cryogenic fluid behavior in space infrastructure
                        systems is governed by:
                      </strong>
                    </p>
                    <ul className="vision-list">
                      <li>
                        Complex dynamic interactions between forced mixing and
                        gravity-dependent transport mechanisms in both vapor and
                        liquid phases.
                      </li>
                      <li>
                        Condensation and evaporation processes at the moving and
                        deforming vapor-liquid interfaces.
                      </li>
                      <li>Gas or liquid injection into bulk phases.</li>
                      <li>
                        Boiling, condensation, and cavitation occurring at solid
                        boundaries.
                      </li>
                    </ul>

                    <p className="ai-paragraph">
                      These phenomena result in complex, interpenetrating phase
                      distributions that must be accurately captured and
                      understood. Due to the highly intricate physical processes
                      involved, there is an increasing reliance on
                      <strong> first-principles computational models</strong>.
                      These models are essential to guide and optimize future
                      propellant tank designs across varying spatial scales,
                      fluid types, and gravitational environments.
                    </p>
                    <p className="ai-paragraph">
                      To address this need, both the space community and ONNES
                      have increasingly leaned toward the use of{" "}
                      <strong>
                        industry-standard, multipurpose Computational Fluid
                        Dynamics (CFD) codes
                      </strong>{" "}
                      to support and guide the design process.However, the{" "}
                      <strong>direct, off-the-shelf application</strong> of
                      these CFD tools to simulate the complex processes involved
                      in{" "}
                      <strong>
                        propellant tank pressurization, pressure control, and
                        transfer—particularly under microgravity conditions—has
                        proven challenging.
                      </strong>{" "}
                      Therefore more tailored modelling approaches are needed to
                      achieve effective results for storage of cryogens and CFM
                      in space conditions.
                    </p>
                  </div>
                </Div>
              ) : (
                <>
                  <Div className="col-lg-6">
                    <SectionHeading
                      title={project.title}
                      subtitle={project.subtitle}
                    >
                      <Spacing lg="40" md="20" />
                      {project.description}
                    </SectionHeading>
                  </Div>

                  <Div className="col-lg-5 offset-lg-1 d-flex flex-column justify-content-center">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src="/images/cfm-b.webp"
                        alt="Tank Technology with MLI"
                        className="img-fluid cs-radius_15"
                        style={{ maxHeight: "500px", width: "80%" }}
                      />
                      <p className="mt-2 text-center">
                        a) Tank Technology integrated with Cryogenics Systems
                        with MLI
                      </p>
                    </div>
                  </Div>
                </>
              )}
            </Div>

            {/* Additional images for project 1 (only CFM-a remains) */}
            {project.id === "1" && (
              <>
                <Spacing lg="50" md="30" />
                <div className="container px-3 px-md-5">
                  <div className="mb-4 d-flex flex-column align-items-center">
                    <img
                      src="/images/cfm-a.webp"
                      alt="Cryogenic Fuels"
                      className="img-fluid cs-radius_15"
                      style={{
                        maxHeight: "1200px",
                        maxWidth: "90%",
                        objectFit: "contain",
                      }}
                    />
                    <p className="mt-2 text-center">
                      b) Cryogenic Fuels are critical for deep space missions to
                      moon and mars
                    </p>
                  </div>
                </div>
              </>
            )}

            <Spacing lg="65" md="10" />

            {/* Navigation buttons */}
            <Div className="cs-page_navigation cs-center nav-fix-align">
              <Div>
                {idx !== 0 && (
                  <Button
                    btnLink={`#${sectionIds[idx - 1]}`}
                    btnText="Previous Project"
                    variant="cs-type1"
                  />
                )}
              </Div>
              <Div>
                {idx !== spaceProjects.length - 1 && (
                  <Button
                    btnLink={`#${sectionIds[idx + 1]}`}
                    btnText="Next Project"
                  />
                )}
              </Div>
            </Div>
          </Div>
        </React.Fragment>
      ))}

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
