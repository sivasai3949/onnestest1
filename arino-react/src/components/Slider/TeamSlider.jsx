import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Team from '../Team';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; 

const teamData = [
  {
    memberImage: '/images/ram-k-aluru.jpg',
    memberName: 'Ram K Aluru ',
    memberDesignation: 'Founder & CEO',
    description: `Ram’s background is in low-temperature physics and quantum material science engineering, he holds a Ph.D. from the Max Planck Institute, Germany and Uni. St Andrews, UK for working on high-temperature superconductors and semiconductor electronics at cryogenic temperatures such as 1.6 K and 30 mK. After his Ph.D., Ram worked as a Research Scientist at the Leiden Institute of Physics in the Netherlands. Apart from having the tech edge in cryogenics and superconducting electronics, Ram also built an EdTech company from scratch and managed Bluetooth technology projects in Industry 4.0. During his doctoral studies, Ram has published his research findings in prestigious journals such as Science, Nature and American Physics Society Journals and he is an avid science communicator and takes an active part in science outreach activities and committed to net zero emissions through his energy ventures.`,
    memberSocial: {
      linkedin: 'https://www.linkedin.com/in/dr-ram-k-aluru-77608a3b/',
    },
  },
  {
    memberImage: '/images/vikram-srinivasa-raghavan.jpg',
    memberName: 'Vikram Raghavan',
    memberDesignation: 'Founder & CTO ',
    description: `VIKRAM has a background in Applied Physics and Instrumentation with 10 yrs. of R&D and 4 yrs. of Industry experience in the carbon composites engineering sector. He has extensive experience in Materials science and specifically in Nanotechnology from Indian Institute of Science, Bangalore. He published 10 papers and has 4 patents in the area of Nanomaterials. He has deep insights into design, fabrication, and quality assurance that will be very useful to build efficient carbon fiber reinforced plastic composite fuel tanks for space and allied applications. Dr. Vikram is part of National Award Winning Team which developed the design and development of digitally controlled heating gloves and pads for soldiers in high mountain areas using carbon fiber composites. Vikram is the winner of the prestigious Global Challengers Research Funding Grant from University of Plymouth, UK.`,
    memberSocial: {
      linkedin: 'https://www.linkedin.com/in/vikram-srinivasa-raghavan-ph-d-5293481a3/',
    },
  },
  {
    memberImage: '/images/rajamani-athimotlu-raju.jpg',
    memberName: 'Rajamani AR',
    memberDesignation: 'Head, Polymer Chemistry',
    memberSocial: {
      linkedin: 'https://www.linkedin.com/in/dr-rajamani-a-r-25518033/',
    },
  },
  {
    memberImage: '/images/aditya.jpg',
    memberName: 'Aditya AS ',
    memberDesignation: 'AI & Quantum Expert',
    memberSocial: {
      linkedin: 'https://www.linkedin.com/in/aditya-as-83a301278/',
    },
  },
  {
    memberImage: '/images/manikanda.png',
    memberName: 'Manikanda',
    memberDesignation: 'Design Engineer',
    memberSocial: {
      linkedin: 'https://www.linkedin.com/in/manikanda-prabhu-921241224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
  },
];

export default function TeamSlider() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,               // Makes the scroll slower (larger = slower)
    autoplay: true,
    autoplaySpeed: 0,          // Must be 0 for continuous scrolling
    cssEase: 'linear',         // Ensures smooth continuous scroll
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,             // Optional: removes manual arrows
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  

  return (
    <>
      <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
        {teamData.map((item, index) => (
          <Div key={index}>
            <Team
              memberImage={item.memberImage}
              memberName={item.memberName}
              memberDesignation={item.memberDesignation}
              memberSocial={item.memberSocial}
            />
            
            {(item.memberName.includes('Ram') || item.memberName.includes('Vikram')) && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => openModal(item)}
                  style={{
                    background: 'transparent',
                    color: '#007bff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Read More
                </button>
              </div>
            )}
          </Div>
        ))}
      </Slider>

      {modalOpen && selectedMember && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
    onClick={closeModal}
  >
    <div
      style={{
        backgroundColor: '#fff',
        width: '400px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '20px',
        borderRadius: '10px',
        position: 'relative',
        textAlign: 'center',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close 'X' button */}
      <button
        onClick={closeModal}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '30px',
          fontWeight: 'bold',
          color: 'black',
          cursor: 'pointer',
        }}
        aria-label="Close"
      >
        ×
      </button>

      <img
        src={selectedMember.memberImage}
        alt={selectedMember.memberName}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '0px',
          border: '2px solid #ccc',
        }}
      />
      <h3 style={{ margin: '2px 0' }}>{selectedMember.memberName}</h3>
      <p style={{ fontWeight: 'bold', margin: '0 0 4px' }}>
        {selectedMember.memberDesignation}
      </p>

      {selectedMember.memberSocial && selectedMember.memberSocial.linkedin && (
        <div
          style={{
            margin: '6px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0077b5',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{
              fontSize: '20px',
              color: '#fff',
              marginRight: '10px',
            }}
          />
          <a
            href={
              selectedMember.memberName.includes('Ram')
                ? 'https://www.linkedin.com/in/dr-ram-k-aluru-77608a3b/'
                : 'https://www.linkedin.com/in/vikram-srinivasa-raghavan-ph-d-5293481a3/'
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Connect on LinkedIn
          </a>
        </div>
      )}

      {selectedMember.description && (
        <div
          style={{
            textAlign: 'left',
            marginTop: '12px',
          }}
        >
          <h4 style={{ marginBottom: '4px', color: '#000' }}>Description:</h4>
          <p
            style={{
              fontSize: '14px',
              whiteSpace: 'pre-line',
              color: '#000',
            }}
          >
            {selectedMember.description}
          </p>
        </div>
      )}
    </div>
  </div>
)}

   </>
  );
}
