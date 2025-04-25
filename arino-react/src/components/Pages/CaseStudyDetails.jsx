import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../helper';
import PageHeading from '../PageHeading';
import Div from '../Div';
import Spacing from '../Spacing';

export default function CaseStudyDetails() {
  pageTitle('Case Study Details');

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <>
      {/* === Page Banner === */}
      <PageHeading
        title="CASE STUDY DETAILS"
        bgSrc="images/team_hero_bg.jpeg"
        pageLinkText="Case Study Details"
      />

      <Spacing lg="100" md="60" />

      <Div className="container">
        {/* Case study details content placeholder */}
        <h2 className="text-center">Stay tuned for case study details and insights!</h2>
        <Spacing lg="100" md="60" />
      </Div>
    </>
  );
}
