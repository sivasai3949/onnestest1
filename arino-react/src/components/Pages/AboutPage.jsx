import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import FunFact from '../FunFact';
import PageHeading from '../PageHeading';
import Div from '../Div';
import Spacing from '../Spacing';

const funfaceData = [
  { title: 'Global Happy Clients', factNumber: '40K' },
  { title: 'Project Completed', factNumber: '50K' },
  { title: 'Team Members', factNumber: '245' },
  { title: 'Digital products', factNumber: '550' },
];

export default function AboutPage() {
  pageTitle('About');

  useEffect(() => {
    // Handle scroll to section when URL hash changes
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Scroll to section on component mount
    handleScroll();

    // Event listener to handle hash change
    window.addEventListener('hashchange', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="About Us"
        bgSrc="images/about_hero_bg.jpeg"
        pageLinkText="About Us"
      />
      {/* End Page Heading Section */}

      {/* Start About Us Section */}
      <Spacing lg="150" md="80" />
      <Div className="container" id="about-us">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <h1>ABOUT US</h1>
            <Spacing lg="30" md="20" />
            <p className="cs-m0">
              This is the main factor that sets us apart from our competition
              and allows us to deliver a specialist business consultancy
              service. Our team applies its wide-ranging experience to
              determining. Through our years of experience, we’ve also learned
              that while each channel.
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg"></Div>
            <Spacing lg="25" md="40" />
          </Div>

          <Div className="col-lg-5 offset-xl-2">
            <img
              src="/images/about_img_1.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>

          <Div className="col-lg-7">
            <img
              src="/images/about_img_2.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>

          <Div className="col-lg-5">
            <img
              src="/images/about_img_3.jpeg"
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />
      {/* End About Us Section */}

      {/* Start Fun Fact Section */}
      <Div className="container">
        <FunFact
          title="Our fun fact"
          subtitle="Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
          data={funfaceData}
        />
      </Div>
      {/* End Fun Fact Section */}

      {/* Start Why Onnes Section */}
      <Spacing lg="100" md="80" />
      <Div className="container" id="why-onnes">
        <Div className="row">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <img
                  src="/images/about_img_4.jpeg"
                  alt="About"
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <h2>Why Onnes</h2>
            <Spacing lg="30" md="20" />
            <p className="cs-m0">
              This is the main factor that sets us apart from our competition
              and allows us to deliver a specialist business consultancy
              service. Our team applies its wide-ranging experience to
              determining. Through our years of experience, we’ve also learned
              that while each channel.
            </p>
            <Spacing lg="15" md="15" />
            <p className="cs-m0">
              This is the main factor that sets us apart from our competition
              and allows us to deliver a specialist business consultancy
              service. Our team applies its wide-ranging experience to
              determining.
            </p>
            <Spacing lg="30" md="30" />
            <Div className="cs-separator cs-accent_bg"></Div>
            <Spacing lg="25" md="0" />
          </Div>
        </Div>
      </Div>
      {/* End Why Onnes Section */}

      {/* Start Vision & Mission Section */}
<Spacing lg="145" md="80" />
<Div className="container" id="vision-mission">
  <h2>Vision & Mission</h2>
  <p className="cs-m0">
    Our vision is to build scalable, efficient, and impactful solutions for businesses.
    Our mission is to empower organizations through creative and smart digital experiences.
  </p>

  {/* Image Row - Responsive */}
  <Div className="cs-image-row" style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '40px',
    justifyContent: 'space-between',
  }}>
    <img
      src="/images/example1.jpg"
      alt="Example 1"
      style={{
        flex: '1 1 48%',
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        objectFit: 'cover',
        minWidth: '250px',
      }}
    />
    <img
      src="/images/example2.jpg"
      alt="Example 2"
      style={{
        flex: '1 1 48%',
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        objectFit: 'cover',
        minWidth: '250px',
      }}
    />
  </Div>
</Div>
{/* End Vision & Mission Section */}


      {/* Start CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
