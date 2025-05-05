import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import CustomCursor from '../CustomCursor';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ headerVariant }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Track frontend visitor
    axios.post('/api/admin-visitors/admin-visitor')
      .then(() => console.log('Visitor logged'))
      .catch((err) => console.error('Visitor logging failed:', err));
  }, []);

  return (
    <>
      <Header variant={headerVariant} />
      <Outlet />
      <CustomCursor />
      <Footer />
    </>
  );
}
