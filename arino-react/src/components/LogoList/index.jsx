import React from 'react';
import Div from '../Div';
import './logolist.scss';

const topPartners = [
  { src: '/images/Partner_1.1.png', alt: 'Partner 1' },
  { src: '/images/Partner_2.1.png', alt: 'Partner 2' },
  { src: '/images/Partner_3.1.jpg', alt: 'Partner 3' },
  { src: '/images/Partner_4.4.png', alt: 'Partner 4' },
  { src: '/images/Partner_4.3.png', alt: 'Partner 5' },
  { src: '/images/Partner_6.1.jpeg', alt: 'Partner 6' },
  { src: '/images/Partner_7.1.png', alt: 'Partner 7' },
];

const bottomPartners = [
  { src: '/images/Client_1.png', alt: 'Partner 8' },
  { src: '/images/Client_2.png', alt: 'Partner 9' },
  { src: '/images/Client_3.png', alt: 'Partner 10' },
  { src: '/images/Client_4.png', alt: 'Partner 11' },
  { src: '/images/Investors_1.jpg', alt: 'Partner12' },
];

export default function LogoList() {
  return (
    <Div className="cs-partner_logo_wrap_outer">
      <Div className="cs-partner_slider_container">
        <div className="cs-partner_logo_slider">
          {[...topPartners, ...topPartners].map((logo, index) => (
            <div
              className={`cs-partner_logo 
                ${logo.alt === 'Partner 6' ? 'partner-6' : ''} 
                ${logo.alt === 'Partner 4' ? 'partner-4' : ''}`}
              key={`top-${index}`}
            >
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </Div>

      <Div className="cs-partner_logo_wrap bottom">
        {bottomPartners.map((logo, index) => {
          const extraClass = 
            logo.alt === 'Partner 8' ? 'partner-8' :
            logo.alt === 'Partner 11' ? 'partner-11' : '';

          return (
            <div className={`cs-partner_logo ${extraClass}`} key={`bottom-${index}`}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          );
        })}
      </Div>
    </Div>
  );
}
