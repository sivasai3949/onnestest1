import React from 'react';
import Div from '../Div';
import './logolist.scss';

// Top scrolling partner logos
const topPartners = [
  { src: '/images/Partner_1.1.png', alt: 'Partner 1' },
  { src: '/images/Partner_2.1.png', alt: 'Partner 2' },
  { src: '/images/Partner_3.1.jpg', alt: 'Partner 3' },
  { src: '/images/Partner_4.4.png', alt: 'Partner 4' },
  { src: '/images/Partner_4.3.png', alt: 'Partner 5' },
  { src: '/images/Partner_6.1.jpeg', alt: 'Partner 6' },
  { src: '/images/Partner_7.1.png', alt: 'Partner 7' },
  { src: '/images/Partner_nvidia.png', alt: 'Partner 7.1' },
];

// Bottom static partners
const bottomPartners = [
  { src: '/images/Client_1.png', alt: 'Partner 8' },
  { src: '/images/Client_2.png', alt: 'Partner 9' },
  { src: '/images/Client_3.png', alt: 'Partner 10' },
  { src: '/images/Client_4.png', alt: 'Partner 11' },
  { src: '/images/Investors_1.jpg', alt: 'Partner12' },
];

// Extra row of 4 partners
const extraBottomPartners = [
  { src: '/images/mufg.png', alt: 'Extra Partner 1' },
  { src: '/images/deepakgroup.png', alt: 'Extra Partner 2' },
  { src: '/images/cropped_cse_logo.svg', alt: 'Extra Partner 3' },
  { src: '/images/newtrace_logo.svg', alt: 'Extra Partner 4' }, // We'll target this
];

export default function LogoList() {
  const duplicatedPartners = [...topPartners, ...topPartners];

  return (
    <Div className="cs-partner_logo_wrap_outer">
      {/* Top Scrolling Row */}
      <Div className="cs-partner_slider_container">
        <div className="cs-partner_logo_slider" aria-label="Top Partners logos scrolling">
          {duplicatedPartners.map((logo, index) => {
            const isLastOfSet =
              index === topPartners.length - 1 || index === duplicatedPartners.length - 1;

            return (
              <div
                className={`cs-partner_logo 
                  ${logo.alt === 'Partner 6' ? 'partner-6' : ''} 
                  ${logo.alt === 'Partner 4' ? 'partner-4' : ''} 
                  ${isLastOfSet ? 'last-logo' : ''}`}
                key={`top-${index}`}
              >
                <img src={logo.src} alt={logo.alt} />
              </div>
            );
          })}
        </div>
      </Div>

      {/* Bottom Row */}
      <Div className="cs-partner_logo_wrap bottom" aria-label="Bottom Partners logos">
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

      {/* Extra Bottom Row */}
      <Div className="cs-partner_logo_wrap extra-bottom" aria-label="Extra Bottom Partners logos">
        {extraBottomPartners.map((logo, index) => {
          // 🎯 Assign class to Newtrace
          let extraClass = '';
          if (logo.alt === 'Extra Partner 1') extraClass = 'extra-mufg';
          else if (logo.alt === 'Extra Partner 2') extraClass = 'extra-deepak';
          else if (logo.alt === 'Extra Partner 3') extraClass = 'extra-cse';
          else if (logo.alt === 'Extra Partner 4') extraClass = 'extra-newtrace'; // <-- Add this

          return (
            <div className={`cs-partner_logo ${extraClass}`} key={`extra-bottom-${index}`}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          );
        })}
      </Div>
    </Div>
  );
}
