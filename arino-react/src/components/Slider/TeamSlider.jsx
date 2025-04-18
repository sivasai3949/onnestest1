import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Team from '../Team';
const teamData = [
  {
    memberImage: '/images/ram-k-aluru.png',
    memberName: 'Dr. Ram K Aluru',
    memberDesignation: 'Chief Executive Officer',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
  {
    memberImage: '/images/vikram-srinivasa-raghavan.png',
    memberName: 'Dr. Vikram Srinivasa Raghavan',
    memberDesignation: 'Chief Technology Officer',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
  {
    memberImage: '/images/rajamani-athimotlu-raju.png',
    memberName: 'Dr. Rajamani Athimotlu Raju',
    memberDesignation: 'Head, Polymer Chemistry',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
  {
    memberImage: '/images/swati-soni.png',
    memberName: 'Dr. Swati Soni',
    memberDesignation: 'Head, Material Science and Nanotechnology',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
  {
    memberImage: '/images/aditya.png',
    memberName: 'Mr. Aditya AS',
    memberDesignation: 'Quasi AI & Quantum Expert',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
  {
    memberImage: '/images/manikanda.png',
    memberName: 'Mr. Manikanda P',
    memberDesignation: 'Design Engineer',
    memberSocial: {
      linkedin: '/',
      // twitter: '/',
      // youtube: '/',
      // facebook: '/',
    },
  },
];

export default function TeamSlider() {
  /** Team Member Data **/

  /** Slider Settings **/
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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
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
    <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
      {teamData.map((item, index) => (
        <Div key={index}>
          <Team
            memberImage={item.memberImage}
            memberName={item.memberName}
            memberDesignation={item.memberDesignation}
            memberSocial={item.memberSocial}
          />
        </Div>
      ))}
    </Slider>
  );
}
