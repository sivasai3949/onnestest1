import React, { useState } from 'react';
import Portfolio from '../Portfolio';
import Div from '../Div';
import Slider from 'react-slick';

export default function PortfolioSlider({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
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
          cursor: pointer;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 20px;
          cursor: pointer;
          font-size: 20px;
        }
      `}</style>

      <Slider {...settings} className="cs-slider cs-style3 cs-gap-24">
        {data.map((item, index) => (
          <Div key={index}>
            <div
              className="portfolio-link"
              onClick={() => setSelectedItem(item)}
            >
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
              />
            </div>
          </Div>
        ))}
      </Slider>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <div className="modal-close" onClick={() => setSelectedItem(null)}>
              &times;
            </div>
            <h2>{selectedItem.title}</h2>
            <img src={selectedItem.src} alt={selectedItem.title} style={{ width: '100%', marginBottom: '1rem' }} />
            <p>
              {/* Replace this with real content later */}
              This is a placeholder description for <strong>{selectedItem.title}</strong>. 
              You can fetch and display more data here as needed.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
