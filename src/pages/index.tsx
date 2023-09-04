import React, { useState, useEffect } from 'react';
import DesktopLayout from '../components/DesktopLayout';
import MobileLayout from '../components/MobileLayout';
import MobileLandscapeLayout from '../components/MobileLandscapeLayout';

interface HomeProps {

}

enum Layout {
  Desktop,
  Mobile,
  MobileLandscape,
}

function Home(props: HomeProps) {
  const [currentLayout, setCurrentLayout] = useState<Layout>(Layout.Desktop);

  // Function to check and set the layout based on screen size and orientation
  const checkLayout = () => {
    if (window.innerWidth > 896) {
      setCurrentLayout(Layout.Desktop);
    } else if (window.innerWidth <= 896 && window.innerHeight >= window.innerWidth) {
      setCurrentLayout(Layout.Mobile);
    } else if (window.innerWidth <= 896 && window.innerHeight < window.innerWidth) {
      setCurrentLayout(Layout.MobileLandscape);
    }
  };

  // useEffect to check the layout when the component mounts and on window resize
  useEffect(() => {
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => {
      window.removeEventListener('resize', checkLayout);
    };
  }, []);

  return (
    <div>
      {currentLayout === Layout.Desktop && <DesktopLayout />}
      {currentLayout === Layout.Mobile && <MobileLayout />}
      {currentLayout === Layout.MobileLandscape && <MobileLandscapeLayout />}
    </div>
  );
}

export default Home;
