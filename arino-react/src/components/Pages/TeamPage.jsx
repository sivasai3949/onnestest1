import React, { useEffect, useRef, useState } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import PageHeading from '../PageHeading';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Team from '../Team';
import { motion, useAnimation } from 'framer-motion';

const teamData = [
  {
    memberImage: '/images/.jpg',
    memberName: 'Melon Bulgery',
    memberDesignation: 'Product Designer',
    memberSocial: {
      linkedin: '/',
      twitter: '/',
      youtube: '/',
      facebook: '/',
    },
  },
  {
    memberImage: '/images/member_2.jpeg',
    memberName: 'Olinaz Fushi',
    memberDesignation: 'UI/UX Expert',
    memberSocial: {
      linkedin: '/',
      twitter: '/',
      youtube: '/',
      facebook: '/',
    },
  },
  {
    memberImage: '/images/member_3.jpeg',
    memberName: 'David Elone',
    memberDesignation: 'React Developer',
    memberSocial: {
      linkedin: '/',
      twitter: '/',
      youtube: '/',
      facebook: '/',
    },
  },
  {
    memberImage: '/images/member_4.jpeg',
    memberName: 'Melina Opole',
    memberDesignation: 'WP Developer',
    memberSocial: {
      linkedin: '/',
      twitter: '/',
      youtube: '/',
      facebook: '/',
    },
  },
  {
    memberImage: '/images/member_5.jpeg',
    memberName: 'Alex Ramos',
    memberDesignation: 'QA Lead',
    memberSocial: {
      linkedin: '/',
      twitter: '/',
      youtube: '/',
      facebook: '/',
    },
  },
];


export default function TeamPage() {
  const carouselRef = useRef();
  const [width, setWidth] = useState(0);
  const controls = useAnimation();

  pageTitle('Team');

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth);
    }
  
    let isMounted = true; // Add this to prevent any set calls if unmounted
  
    // Auto scroll animation loop
    const startAutoScroll = async () => {
      while (isMounted) {
        await controls.start({
          x: -width / 2,
          transition: {
            duration: 15,
            ease: 'linear',
          },
        });
  
        if (isMounted) {
          // Only call set AFTER animation finishes and component is mounted
          controls.set({ x: 0 });
        }
      }
    };
  
    startAutoScroll();
  
    return () => {
      isMounted = false; // Cleanup to prevent setting state if unmounted
    };
  }, [width, controls]);
  
  
  return (
    <>
      {/* === Page Banner === */}
      <PageHeading
        title="Meet the Founders & Team"
        bgSrc="images/team_hero_bg.jpeg"
        pageLinkText="Team"
      />

      {/* === Founders Section === */}
      <Spacing lg="100" md="60" />
      <Div className="container">
        <SectionHeading
          title="Meet the Visionaries"
          subtitle="Our Founders"
          variant="cs-style1 text-center"
        />
        <Spacing lg="60" md="40" />
        <Div className="row">
          <Div className="col-lg-6">
            <h3>Founder 1 – John Doe</h3>
            <p>
              John is the brain behind our innovation and mission. With 15+ years of experience in
              building high-performance tech teams, John drives the product vision and culture of
              excellence.
            </p>
          </Div>
          <Div className="col-lg-6">
            <h3>Founder 2 – Jane Smith</h3>
            <p>
              Jane is the powerhouse of execution and growth. She's known for scaling startups into
              sustainable businesses and leads our operations and strategy with unmatched clarity.
            </p>
          </Div>
        </Div>
      </Div>

      {/* === Team Members Section (Auto-Scrolling Carousel) === */}
      <Spacing lg="100" md="60" />
      <Div className="container">
        <SectionHeading
          title="Meet our awesome <br/>team members"
          subtitle="Our Team"
          variant="cs-style1 text-center"
        />
        <Spacing lg="60" md="40" />
        <div
          className="overflow-hidden"
          ref={carouselRef}
          style={{ width: '100%', position: 'relative' }}
        >
          <motion.div
            className="d-flex"
            animate={controls}
            style={{ display: 'flex', gap: '30px' }}
          >
            {/* Repeat items to enable seamless looping */}
            {[...teamData, ...teamData].map((item, index) => (
              <motion.div
                key={index}
                className="p-2"
                style={{ minWidth: '300px', flex: '0 0 auto' }}
                whileHover={{ scale: 1.05 }}
              >
                <Team
                  memberImage={item.memberImage}
                  memberName={item.memberName}
                  memberDesignation={item.memberDesignation}
                  memberSocial={item.memberSocial}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Div>

      {/* === Partners Section === */}
      <Spacing lg="100" md="60" />
      <Div className="container text-center">
        <SectionHeading
          title="Our Strong Network"
          subtitle="Partners, Clients & Investors"
          variant="cs-style1 text-center"
        />
        <Spacing lg="50" md="30" />
        <Div className="row justify-content-center text-center">
          <Div className="col-lg-4 col-md-6 mb-4">
            <div className="p-4 border rounded-3 shadow-sm h-100">
              <h3>Partners</h3>
              <p>We collaborate with world-class partners across industries.</p>
            </div>
          </Div>
          <Div className="col-lg-4 col-md-6 mb-4">
            <div className="p-4 border rounded-3 shadow-sm h-100">
              <h3>Clients</h3>
              <p>Our clients trust us to solve mission-critical challenges.</p>
            </div>
          </Div>
          <Div className="col-lg-4 col-md-6 mb-4">
            <div className="p-4 border rounded-3 shadow-sm h-100">
              <h3>Investors</h3>
              <p>Backed by passionate investors who believe in our vision.</p>
            </div>
          </Div>
        </Div>
      </Div>

      {/* === CTA === */}
      <Spacing lg="70" md="50" />
      <Div className="container">
        <Cta
         title="Let’s discuss to make <br /> ultra <i>cool</i> and <i>light</i> tanks integrated with bespoke cryogenic systems"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}
