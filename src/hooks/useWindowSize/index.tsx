import { useState, useEffect } from 'react';

interface windowSizeType {
  width: number | undefined;
  height: number | undefined;
}

const breakPointConfig = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5,
};

const getBreakPoint = (width: number) => {
  if (width >= 1536) return 5;
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  if (width >= 640) return 1;
  return 0;
};

const useWindowSize = (): [windowSizeType, number, { [type: string]: number }] => {
  const [windowSize, setWindowSize] = useState<windowSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [breakPoint, setBreakPoint] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setBreakPoint(getBreakPoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [windowSize, breakPoint, breakPointConfig];
};

export default useWindowSize;
