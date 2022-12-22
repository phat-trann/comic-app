import React, { useEffect, useState } from 'react';
import { ChevronUp } from '~/icons';

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScrollWindow = () => {
      if (window.scrollY > 140) setShowBackToTop(true);
      else setShowBackToTop(false);
    };

    window.addEventListener('scroll', handleScrollWindow);

    return () => window.removeEventListener('scroll', handleScrollWindow);
  }, []);

  return showBackToTop ? (
    <div
      className="fixed bottom-16 right-4 z-10 text-orange-600 border rounded p-2 "
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ChevronUp />
    </div>
  ) : (
    <></>
  );
};

export default BackToTop;
