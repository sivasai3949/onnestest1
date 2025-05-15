import React, { useState, useEffect } from 'react';
import TechnologyPage from './TechnologyPage';
import TechnologyMobile from './TechnologyMobile';

export default function TechnologyController() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Listen for resize events (with debounce)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 200);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <TechnologyMobile /> : <TechnologyPage />;
}