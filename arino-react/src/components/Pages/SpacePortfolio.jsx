import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import FunFact from '../FunFact';
import PageHeading from '../PageHeading';
import Div from '../Div';
import Spacing from '../Spacing';
import SectionHeading from '../SectionHeading';
import Button from '../Button';

const funfaceData = [
  { title: 'Global Happy Clients', factNumber: '40K' },
  { title: 'Project Completed', factNumber: '50K' },
  { title: 'Team Members', factNumber: '245' },
  { title: 'Digital products', factNumber: '550' },
];

const spaceProjects = [
  {
    id: '1',
    title: 'Space Cryogenic Tank System',
    subtitle: 'Aerospace Engineering',
    img: '/images/portfolio_details_1.jpeg',
    category: 'Cryogenics',
    location: 'International Space Station',
    software: 'ANSYS, SolidWorks',
    date: '12-Nov-2023',
    client: 'NASA',
    description: [
      'Advanced cryogenic storage solutions for long-duration space missions with ultra-lightweight materials.',
      'Innovative thermal management system to maintain optimal temperatures in zero-gravity environments.'
    ]
  },
  {
    id: '2',
    title: 'Satellite Propulsion Module',
    subtitle: 'Defence Technology',
    img: '/images/portfolio_2.jpeg',
    category: 'Propulsion',
    location: 'Low Earth Orbit',
    software: 'MATLAB, COMSOL',
    date: '05-Mar-2024',
    client: 'SpaceX',
    description: [
      'Compact propulsion system for next-generation communication satellites.',
      'Fuel-efficient design with extended operational lifespan.'
    ]
  },
  {
    id: '3',
    title: 'Satellite Propulsion Module',
    subtitle: 'Defensce Technology',
    img: '/images/portfolio_3.jpeg',
    category: 'Propulsion',
    location: 'Low Earth Orbit',
    software: 'MATLAB, COMSOL',
    date: '05-Mar-2024',
    client: 'SpaceX',
    description: [
      'Compact propulsion system for next-generation communication satellites.',
      'Fuel-efficient design with extended operational lifespan.'
    ]
  }
];

const sectionHeadings = ["SPACE", "AERO SPACE", "DEFENCE"];

export default function SpacePortfolio() {
  pageTitle('Space Portfolio');

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    handleScroll();
    window.addEventListener('hashchange', handleScroll);
    return () => window.removeEventListener('hashchange', handleScroll);
  }, []);

  return (
    <>
      {/* Page Heading Section */}
      <PageHeading
        title="SPACE-AEROSPACE-DEFENCE"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="Space Portfolio"
      />

      {/* Project Sections */}
      {spaceProjects.map((project, idx) => (
        <React.Fragment key={project.id}>
          <Spacing lg="80" md="40" />
          {/* Section Heading */}
          <Div className="container">
            <h2 className="cs-page_title cs-center cs-font_50 cs-font_30_sm cs-m0">
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
          </Div>
          <Spacing lg="75" md="55" />

          {/* Project Details */}
          <Div className="container" id={`project-${project.id}`}>
            <Spacing lg="90" md="40"/>
            <Div className="row">
              <Div className="col-lg-6">
                <SectionHeading 
                  title={project.title} 
                  subtitle={project.subtitle} 
                >
                  <Spacing lg="40" md="20"/>
                  {project.description.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </SectionHeading>
              </Div>
              <Div className="col-lg-5 offset-lg-1">
                <Spacing lg="60" md="40"/>
                <h2 className="cs-font_30 cs-font_26_sm cs-m0">Project Specifications</h2>
                <Spacing lg="50" md="30"/>
                <Div className="row">
                  <Div className="col-6">
                    <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Category:</h3>
                    <p className="cs-m0">{project.category}</p>
                    <Spacing lg="30" md="30"/>
                  </Div>
                  <Div className="col-6">
                    <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Location:</h3>
                    <p className="cs-m0">{project.location}</p>
                    <Spacing lg="30" md="30"/>
                  </Div>
                  <Div className="col-6">
                    <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Software:</h3>
                    <p className="cs-m0">{project.software}</p>
                    <Spacing lg="30" md="30"/>
                  </Div>
                  <Div className="col-6">
                    <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Dated:</h3>
                    <p className="cs-m0">{project.date}</p>
                    <Spacing lg="30" md="30"/>
                  </Div>
                  <Div className="col-6">
                    <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Client:</h3>
                    <p className="cs-m0">{project.client}</p>
                    <Spacing lg="30" md="30"/>
                  </Div>
                </Div>
              </Div>
            </Div>
            <Spacing lg="65" md="10"/>
            {/* Navigation Buttons */}
            <Div className="cs-page_navigation cs-center">
              <Div>
                <Button 
                  btnLink={`#project-${spaceProjects[(idx - 1 + spaceProjects.length) % spaceProjects.length].id}`} 
                  btnText='Previous Project' 
                  variant='cs-type1'
                />
              </Div>
              <Div>
                <Button 
                  btnLink={`#project-${spaceProjects[(idx + 1) % spaceProjects.length].id}`} 
                  btnText='Next Project'
                />
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
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="about_img_1.jpeg"
        />
      </Div>
    </>
  );
}
