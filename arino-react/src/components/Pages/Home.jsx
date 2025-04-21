import React, { useEffect } from "react";
import Card from "../Card";
import FunFact from "../FunFact";
import Hero from "../Hero";
import Div from "../Div";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import Cta from "../Cta";
import LogoList from "../LogoList";
import MovingText from "../MovingText";
import PortfolioSlider from "../Slider/PortfolioSlider";
import PostSlider from "../Slider/PostSlider";
import TestimonialSlider from "../Slider/TestimonialSlider";
import TeamSlider from "../Slider/TeamSlider";
import VideoModal from "../VideoModal";
import TimelineSlider from "../Slider/TimelineSlider";
import { pageTitle } from "../../helper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import Button from '../Button'; // Add this import with your other imports

const heroImages = [
  "/images/Home_1.webp",
  "/images/Home_2.webp",
  "/images/Home_3.webp",
  "/images/Home_4.webp",
  "/images/Home_5.webp",
  "/images/Home_6.webp",
  "/images/Home_7.webp",
];
// Hero Social Links
const heroSocialLinks = [
  {
    name: "Behance",
    links: "/",
  },
  {
    name: "Twitter",
    links: "/",
  },
];

// FunFact Data
const funfaceData = [
  {
    title: "Global Happy Clients",
    factNumber: "40K",
  },
  {
    title: "Project Completed",
    factNumber: "50K",
  },
  {
    title: "Team Members",
    factNumber: "245",
  },
  {
    title: "Digital products",
    factNumber: "550",
  },
];
const portfolioData = [
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_1.jpeg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_2.jpeg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_0.jpg",
  },
  {
    title: "Colorful Art Work",
    subtitle: "See Details",
    href: "/portfolio/portfolio-details",
    src: "/images/portfolio_3.jpeg",
  },
];

export default function Home() {
  pageTitle("Home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sliderSettings = {
    dots: false, // Hides dots for a cleaner look
    infinite: true, // Ensures looping
    speed: 1000, // Smooth transition speed
    slidesToShow: 1, // Shows one image at a time
    slidesToScroll: 1, // Scrolls one image at a time
    autoplay: true, // Enables automatic sliding
    autoplaySpeed: 2500, // Adjusts speed for a natural feel
    pauseOnHover: false, // Prevents pausing when hovered
    swipeToSlide: true, // Allows smooth swiping
    arrows: false, // Hides arrows for a cleaner look
    cssEase: "ease-in-out", // Ensures smooth easing
  };

  return (
    <>
      {/* Start Hero Section */}
      <div className="hero-slider">
        <Slider {...sliderSettings}>
          {heroImages.map((image, index) => (
            <div key={index} className="hero-slide-wrapper">
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="hero-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* End Hero Section */}

      {/* Start FunFact Section */}
      {/* <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our fun fact"
          subtitle="Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
          data={funfaceData}
        />
      </div> */}
      {/* End FunFact Section */}

      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <div className="cs-section_heading cs-style1">
                <h3 className="cs-section_subtitle">Onnes Expertise Lies In</h3>
                <h2 className="cs-section_title" style={{ fontSize: "40px" }}>
                  Next Generation Tank Technology Integrated with Cryogenics
                </h2>
                <Spacing lg="45" md="20" />
                <Button btnLink="/service" btnText="See All Services" />
              </div>
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row">
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>

                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Product Design"
                    link="/service/service-details"
                    src="/images/productdesign.jpg"
                    alt="Service"
                  />
                  <Spacing lg="30" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Material Simulations"
                    link="/service/service-details"
                    src="/images/materialsimulation.jpg"
                    alt="Service"
                  />
                  <Spacing lg="30" md="30" />
                </Div>

                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Assembly"
                    link="/service/service-details"
                    src="/images/assembly.jpg"
                    alt="Service"
                  />
                  <Spacing lg="30" md="30" />
                </Div>

                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>

                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Cryogenic Testing"
                    link="/service/service-details"
                    src="/images/cryogenictesting.jpg"
                    alt="Service"
                  />
                  <Spacing lg="30" md="30" />
                </Div>

                {/* ✅ New Card Added Below */}
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Manufacturing"
                    link="/service/service-details"
                    src="/images/manufacturing.jpg" // Replace with actual image path
                    alt="Service"
                  />
                  <Spacing lg="30" md="30" />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="50" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Portfolio to explore"
            subtitle="Latest Projects"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData} />
      </Div>
      {/* End Portfolio Section */}

      {/* Start Awards Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="We get multiple awards"
                subtitle="Our Awards"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider />
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Awards Section */}

      {/* Start Video Block Section */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          Our agile process is ability to adapt and respond to change. Agile
          organizations view change as an opportunity, not a threat.
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="https://youtu.be/JRl4n6nj4HM?si=-zoX4xFuMUAhEqwL"
          bgUrl="/images/video_bg.jpeg"
        />
      </Div>
      {/* End Video Block Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Awesome team <br/>members"
          subtitle="Our Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Team Section */}

      {/* Start Testimonial Section */}
      {/* <TestimonialSlider /> */}
      {/* End Testimonial Section */}

      {/* Start Blog Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Explore recent publication"
                subtitle="Our Blog"
                btnText="View More Blog"
                btnLink="/blog"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Onnes thanks its partners , clients and investors for their continued support! " />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End LogoList Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let’s discuss to make <br /> ultra <i>cool</i> and <i>light</i> integrated with bespoke cryogenic systems"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
