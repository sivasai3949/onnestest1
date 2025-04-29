import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../Div';

export default function PageHeading({ title, bgSrc, overlayImage, pageLinkText }) {
  return (
    <Div
      className="cs-page_heading cs-style1 cs-center text-center cs-bg"
      style={{
        position: 'relative',
        backgroundImage: `url(${bgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay Image */}
      {overlayImage && (
        <img
          src={overlayImage}
          alt="Overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3, // Adjust as needed
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <Div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Div className="cs-page_heading_in">
          <h1 className="cs-page_title cs-font_50 cs-white_color">{title}</h1>
          <ol className="breadcrumb text-uppercase">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{pageLinkText}</li>
          </ol>
        </Div>
      </Div>
    </Div>
  );
}
