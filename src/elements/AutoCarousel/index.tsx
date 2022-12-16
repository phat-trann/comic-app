import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '~/hooks';
import ChevronLeft from '~/icons/ChevronLeft';
import ChevronRight from '~/icons/ChevronRight';

const Carousel = <T,>({
  id,
  dataList,
  render,
}: {
  id: string;
  dataList: T[];
  render: (arg: [T, number, string, string]) => ReactElement;
}) => {
  const [leftLink, setLeftLink] = useState();
  const [rightLink, setRightLink] = useState('#1');
  const carousel = useRef<HTMLDivElement | null>(null);
  const [windowSize, currentBreakPoint] = useWindowSize();

  const handleScroll = (e) => {
    console.log(e);
  };

  // useEffect(() => {
  //   // const autoTimeout = setTimeout(() => {
  //   //   console.log(autoTimeout);
  //   // }, 1000);

  //   console.log(carousel.current);

  //   if (carousel.current) {
  //     carousel.current.addEventListener('scroll:carousel', handleScroll, true);
  //   }

  //   return () => {
  //     // clearTimeout(autoTimeout);
  //     carousel.current?.removeEventListener('scroll:carousel', handleScroll);
  //   };
  // });

  const handleGoToSection = (event: React.MouseEvent<HTMLAnchorElement>, link?: string) => {
    event.preventDefault();

    console.log(link);
  };
  return (
    <div className="relative flex w-full flex-wrap">
      <div className="carousel-center carousel w-screen" onScroll={handleScroll}>
        {dataList.map((comic: T, index: number) =>
          render([comic, index, [id, index + 1].join('-'), 'carousel-item ']),
        )}
      </div>
      <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a
          className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${
            !leftLink || currentBreakPoint < 2 ? ' invisible' : ''
          }`}
          onClick={(e) => handleGoToSection(e, leftLink)}
        >
          <ChevronLeft />
        </a>
        <a
          className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${
            !rightLink || currentBreakPoint < 2 ? ' invisible' : ''
          }`}
          onClick={(e) => handleGoToSection(e, rightLink)}
        >
          <ChevronRight />
        </a>
      </div>
    </div>
  );
};

export default Carousel;
