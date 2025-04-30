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
  { title: 'Global Happy Clients', factNumber: '20' },
  { title: 'Project Completed', factNumber: '12' },
  { title: 'Team Members', factNumber: '15' },
  { title: 'Spin-off products', factNumber: '50' },
];

const spaceProject = {
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
};

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
        title="GROUND BASED STORAGE SOLUTIONS"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="Ground Based Storage"
      />

      <Spacing lg="80" md="40" />
      {/* Project Image */}
      <Div className="container">
        <img
          src={spaceProject.img}
          alt={spaceProject.title}
          className="cs-radius_15 w-100"
        />
      </Div>
      <Spacing lg="75" md="55" />

      {/* Project Details */}
      <Div className="container">
        <Spacing lg="90" md="40"/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title={spaceProject.title} 
              subtitle={spaceProject.subtitle} 
            >
              <Spacing lg="40" md="20"/>
              {spaceProject.description.map((text, index) => (
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
                <p className="cs-m0">{spaceProject.category}</p>
                <Spacing lg="30" md="30"/>
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Location:</h3>
                <p className="cs-m0">{spaceProject.location}</p>
                <Spacing lg="30" md="30"/>
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Software:</h3>
                <p className="cs-m0">{spaceProject.software}</p>
                <Spacing lg="30" md="30"/>
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Dated:</h3>
                <p className="cs-m0">{spaceProject.date}</p>
                <Spacing lg="30" md="30"/>
              </Div>
              <Div className="col-6">
                <h3 className="cs-accent_color cs-font_22 cs-font_18_sm cs-m0">Client:</h3>
                <p className="cs-m0">{spaceProject.client}</p>
                <Spacing lg="30" md="30"/>
              </Div>
            </Div>
          </Div>
        </Div>
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
    </>
  );
}