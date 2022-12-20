import { useState, useEffect } from 'react';

interface windowSizeType {
  width: number;
  height: number;
}

const config = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5,
  xxl: 6,
};

const getBreakPoint = (width: number) => {
  if (width >= 1600) return config['xxl'];
  if (width >= 1536) return config['2xl'];
  if (width >= 1280) return config['xl'];
  if (width >= 1024) return config['lg'];
  if (width >= 768) return config['md'];
  if (width >= 640) return config['sm'];
  return config['xs'];
};

const useWindowSize = (): [windowSizeType, number, { [type: string]: number }] => {
  const [windowSize, setWindowSize] = useState<windowSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [breakPoint, setBreakPoint] = useState(getBreakPoint(window.innerWidth));

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

  return [windowSize, breakPoint, config];
};

export default useWindowSize;
