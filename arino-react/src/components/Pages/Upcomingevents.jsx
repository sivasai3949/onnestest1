import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitle } from '../../helper';
import PageHeading from '../PageHeading';
import Div from '../Div';
import Spacing from '../Spacing';

export default function UpcomingEvents() {
  pageTitle('Upcoming Events');

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
        title="UPCOMING EVENTS"
        bgSrc="images/team_hero_bg.jpeg"
        pageLinkText="Upcoming Events"
      />

      <Spacing lg="100" md="60" />

      <Div className="container">
        {/* You can add upcoming events content here */}
        <h2 className="text-center">Stay tuned for upcoming event announcements!</h2>
        <Spacing lg="100" md="60" />
      </Div>
    </>
  );
}
