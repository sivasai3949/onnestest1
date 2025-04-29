import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Div from "../Div";
import PageHeading from "../PageHeading";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ContactInfoWidget from "../Widget/ContactInfoWidget";

export default function ContactPage() {
  pageTitle("Contact Us");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PageHeading
        title="Contact Us"
        bgSrc="/images/contact_hero_bg.jpeg"
        pageLinkText="Contact"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title="Do you have a project <br/>in your mind?"
              subtitle="Getting Touch"
            />
            <Spacing lg="55" md="30" />
            <ContactInfoWidget withIcon />
            <Spacing lg="0" md="50" />
          </Div>
          <Div className="col-lg-6">
            <form action="#" className="row">
              <Div className="col-sm-6">
                <label className="cs-primary_color">Full Name*</label>
                <input type="text" className="cs-form_field" />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Email*</label>
                <input type="text" className="cs-form_field" />
                <Spacing lg="20" md="20" />
              </Div>
              <div className="col-sm-6">
                <label className="cs-primary_color">Product Category</label>
                <select className="cs-form_field">
                  <option value="" style={{ backgroundColor: '#000', color: '#fff' }}>Select Project Type</option>
                  <option value="SPACE" style={{ backgroundColor: '#000', color: '#fff' }} onMouseOver={(e) => e.target.style.backgroundColor = '#00B5F9'} onMouseOut={(e) => e.target.style.backgroundColor = '#000'}>SPACE</option>
                  <option value="DEFENCE" style={{ backgroundColor: '#000', color: '#fff' }} onMouseOver={(e) => e.target.style.backgroundColor = '#00B5F9'} onMouseOut={(e) => e.target.style.backgroundColor = '#000'}>DEFENCE</option>
                  <option value="GROUND" style={{ backgroundColor: '#000', color: '#fff' }} onMouseOver={(e) => e.target.style.backgroundColor = '#00B5F9'} onMouseOut={(e) => e.target.style.backgroundColor = '#000'}>GROUND</option>
                  <option value="OTHERS" style={{ backgroundColor: '#000', color: '#fff' }} onMouseOver={(e) => e.target.style.backgroundColor = '#00B5F9'} onMouseOut={(e) => e.target.style.backgroundColor = '#000'}>OTHERS</option>
                </select>
                <Spacing lg="20" md="20" />
              </div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Mobile*</label>
                <input type="text" className="cs-form_field" />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-12">
                <label className="cs-primary_color">Message*</label>
                <textarea cols="30" rows="7" className="cs-form_field"></textarea>
                <Spacing lg="25" md="25" />
              </Div>
              <Div className="col-sm-12">
                <button className="cs-btn cs-style1">
                  <span>Send Message</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
            </form>
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />

      {/* Embedded Google Map with T-Hub Location */}
      <div className="cs-google_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5387246675623!2d78.3762381736905!3d17.43391080146618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93bd18410b0f%3A0x8d7e3fea891858ce!2sT-Hub!5e0!3m2!1sen!2sin!4v1745926796929!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="T-Hub Hyderabad"
        ></iframe>
      </div>

      <Spacing lg="50" md="40" />
    </>
  );
}
