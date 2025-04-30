import React from 'react';
import Portfolio from '../Portfolio';
import Div from '../Div';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

export default function PortfolioSlider({ data }) {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 800,
    cssEase: 'ease-in-out',
    dots: false,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <style>{`
        .cs-slider .slick-slide {
          opacity: 0.7;
          transform: scale(0.95);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .cs-slider .slick-center {
          opacity: 1;
          transform: scale(1);
        }

        .portfolio-link {
          display: block;
          text-decoration: none;
        }
      `}</style>

      <Slider {...settings} className="cs-slider cs-style3 cs-gap-24">
        {data.map((item, index) => (
          <Div key={index}>
            <NavLink to={item.href} className="portfolio-link">
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
              />
            </NavLink>
          </Div>
        ))}
      </Slider>
    </>
  );
}
