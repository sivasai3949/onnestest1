import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import blogImage1 from "../../blogimages/blog_image1.1.jpg";
import blogImage2 from "../../blogimages/blog_image2.webp";
import blogImage3 from "../../blogimages/blog_image3.webp";
import blogImage4 from "../../blogimages/blog_image4.webp";
import blogImage5 from "../../blogimages/blog_image5.webp";
import blogImage6 from "../../blogimages/blog_image6.webp";

const postData = [
  {
    url: 'https://sasic.sa.gov.au/events-news-media/news/four-start-ups-shoot-for-the-stars-in-south-australian-venture-catalyst-space-program/',
    src: blogImage1,
    alt: 'Post',
    title: 'Four start‑ups shoot for the stars in<br />South Australian Venture Catalyst Space Program',
  },
  {
    url: 'https://icc.unisa.edu.au/newsroom/2024/reinforced-plastic-fuel-tanks-in-space-and-mobile-insulin-farms-rocketing-sas-space-sector/',
    src: blogImage2,
    alt: 'Post',
    title: 'Reinforced plastic fuel tanks in space<br />and mobile insulin farms rocketing SA’s space sector',
  },
  {
    url: 'https://www.nist.gov/news-events/news/2017/05/no-liquid-helium-still-extremely-cool',
    src: blogImage3,
    alt: 'Post',
    title: 'No Liquid Helium,<br />But Still Extremely Cool',
  },
  {
    url: 'https://phys.org/news/2013-01-electronics-cold-cryocooler.html',
    src: blogImage4,
    alt: 'Post',
    title: 'Electronics like it cold,<br />and 30 K cryocooler delivers',
  },
  {
    url: 'https://www.flightglobal.com/lockheed-prepping-advanced-eots-and-legion-pod-for-flight-tests/119918.article',
    src: blogImage5,
    alt: 'Post',
    title: 'Prepping Advanced EOTS<br />for flight tests',
  },
  {
    url: 'https://yourstory.com/2024/06/aws-selects-24-indian-startups-for-space-accelerator-programme',
    src: blogImage6,
    alt: 'Post',
    title: 'Amazon Web Services selects 24 Indian startups<br />for space accelerator programme',
  },
];

function Post({ url, src, alt, title }) {
  return (
    // <a
    //   href={url}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   style={{
    //     display: 'block',
    //     position: 'relative',
    //     width: '100%',
    //     height: '300px',
    //     overflow: 'hidden',
    //     borderRadius: '12px',
    //     textDecoration: 'none',
    //   }}
    // >
    <div
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        borderRadius: '12px',
        textDecoration: 'none',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '12px 15px',
          color: '#ffffff',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '1.4',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
          textShadow: '0 0 6px rgba(255,255,255,0.8)',
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
    // </a>
  );
}


export default function PostSlider() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000, // 1 second per slide
    speed: 2000,         // Smooth transition duration
    cssEase: 'ease-in-out',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } },
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24">
      {postData.map((item, index) => (
        <Div key={index}>
          <Post
            url={item.url}
            src={item.src}
            alt={item.alt}
            title={item.title}
          />
        </Div>
      ))}
    </Slider>
  );
}
