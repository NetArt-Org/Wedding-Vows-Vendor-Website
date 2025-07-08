import { useState, useEffect } from 'react';

const PlasmicHydrationWrapper = ({ children, fallback = <div>Loading...</div> }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Use a small delay to ensure all hydration is complete
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // During SSR and initial client render, show fallback
  if (!isClient || !isHydrated) {
    return fallback;
  }

  return children;
};

export default PlasmicHydrationWrapper; 