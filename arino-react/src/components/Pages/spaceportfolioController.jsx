import React, { useState, useEffect } from 'react';
import SpacePortfolio from './SpacePortfolio';
import SpacePortfolioMobile from './SpacePortfolioMobile';

export default function SpacePortfolioController() {
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

  return isMobile ? <SpacePortfolioMobile /> : <SpacePortfolio />;
}