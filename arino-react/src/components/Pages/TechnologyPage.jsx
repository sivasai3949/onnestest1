import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import PageHeading from '../PageHeading';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';

export default function TechnologyPage() {
  pageTitle('Technology');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* === Page Banner === */}
      <PageHeading
        title="TECHNOLOGY"
        bgSrc="images/team_hero_bg.jpeg"
        pageLinkText="Technology"
      />

      <Spacing lg="100" md="60" />

      <Div className="container">
        {/* === Section 1: Carbon Fiber Tanks === */}
        <Div className="row align-items-center mb-5">
          {/* Section Theory */}
          <Div className="col-lg-6">
            <h2 className="text-right">Carbon Fiber Tanks</h2>
            <p>
              Our advanced carbon fiber tanks are engineered for maximum strength
              and minimal weight, making them ideal for high-pressure fuel
              storage in aerospace and automotive applications. Designed with
              safety and performance at the core, they offer superior durability
              and efficiency.
            </p>
          </Div>
        </Div>

        {/* Photos for Carbon Fiber Tanks */}
        <Div className="row mb-5">
          <Div className="col-lg-6 mb-4">
            <img
              src="/images/tech_carbon_fiber.jpg"
              alt="Carbon Fiber Tanks"
              className="w-100 rounded-3 shadow"
            />
          </Div>
          <Div className="col-lg-6">
            <img
              src="/images/tech_carbon_fiber_2.jpg"
              alt="Carbon Fiber Tanks"
              className="w-100 rounded-3 shadow"
            />
          </Div>
        </Div>

        {/* === Section 2: Cryogenics Systems === */}
        <Div className="row align-items-center mb-5">
          {/* Section Theory */}
          <Div className="col-lg-6">
            <h2 className="text-right">Cryogenics Systems</h2>
            <p>
              We design and build highly efficient cryogenic systems for the
              storage and transport of liquefied gases like hydrogen and
              oxygen. Our systems maintain ultra-low temperatures with advanced
              insulation and safety features, enabling optimal performance in
              extreme conditions.
            </p>
          </Div>
        </Div>

        {/* Photos for Cryogenics Systems */}
        <Div className="row mb-5">
          <Div className="col-lg-6 mb-4">
            <img
              src="/images/tech_cryogenics.jpg"
              alt="Cryogenics Systems"
              className="w-100 rounded-3 shadow"
            />
          </Div>
          <Div className="col-lg-6">
            <img
              src="/images/tech_cryogenics_2.jpg"
              alt="Cryogenics Systems"
              className="w-100 rounded-3 shadow"
            />
          </Div>
        </Div>

        {/* === Section 3: Thermal Management === */}
        <Div className="row align-items-center mb-5">
          {/* Section Theory */}
          <Div className="col-lg-6">
            <h2 className="text-right">Thermal Management</h2>
            <p>
              Thermal control is critical in high-performance systems. We provide
              advanced thermal management solutions including phase-change
              materials, active cooling systems, and heat exchangers to regulate
              temperatures and improve efficiency across various platforms.
            </p>
          </Div>
        </Div>

        {/* Photos for Thermal Management */}
        <Div className="row mb-5">
          <Div className="col-lg-6 mb-4">
            <img
              src="/images/tech_thermal.jpg"
              alt="Thermal Management"
              className="w-100 rounded-3 shadow"
            />
          </Div>
          <Div className="col-lg-6">
            <img
              src="/images/tech_thermal_2.jpg"
              alt="Thermal Management"
              className="w-100 rounded-3 shadow"
            />
          </Div>
        </Div>

        {/* === Section 4: Recycling of CFS === */}
        <Div className="row align-items-center mb-5">
          {/* Section Theory */}
          <Div className="col-lg-6">
            <h2 className="text-right">Recycling of CFS</h2>
            <p>
              Our cutting-edge recycling technology enables efficient recovery
              and reuse of carbon fiber scrap (CFS), reducing waste and
              supporting sustainable manufacturing practices. We contribute to a
              circular economy with minimal environmental footprint.
            </p>
          </Div>
        </Div>

        {/* Photos for Recycling of CFS */}
        <Div className="row mb-5">
          <Div className="col-lg-6 mb-4">
            <img
              src="/images/tech_recycling.jpg"
              alt="Recycling of CFS"
              className="w-100 rounded-3 shadow"
            />
          </Div>
          <Div className="col-lg-6">
            <img
              src="/images/tech_recycling_2.jpg"
              alt="Recycling of CFS"
              className="w-100 rounded-3 shadow"
            />
          </Div>
        </Div>

        <Spacing lg="100" md="60" />
      </Div>
    </>
  );
}
