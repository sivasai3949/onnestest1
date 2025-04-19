import React from 'react';
import Div from '../Div';
import './logolist.scss';

const topPartners = [
  { src: '/images/partner_1.svg', alt: 'Partner 1' },
  { src: '/images/partner_2.svg', alt: 'Partner 2' },
  { src: '/images/partner_3.svg', alt: 'Partner 3' },
  { src: '/images/partner_4.svg', alt: 'Partner 4' },
  { src: '/images/partner_5.svg', alt: 'Partner 5' },
];

const bottomPartners = [
  { src: '/images/partner_6.svg', alt: 'Partner 6' },
  { src: '/images/partner_7.svg', alt: 'Partner 7' },
  { src: '/images/partner_8.svg', alt: 'Partner 8' },
];

export default function LogoList() {
  return (
    <Div className="cs-partner_logo_wrap_outer">
      <Div className="cs-partner_logo_wrap top">
        {topPartners.map((logo, index) => (
          <div className="cs-partner_logo" key={`top-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </Div>
      <Div className="cs-partner_logo_wrap bottom">
        {bottomPartners.map((logo, index) => (
          <div className="cs-partner_logo" key={`bottom-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </Div>
    </Div>
  );
}
