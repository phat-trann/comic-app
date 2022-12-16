import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '~/hooks';

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

  useEffect(() => {
    // const autoTimeout = setTimeout(() => {
    //   console.log(autoTimeout);
    // }, 1000);
    const handleScroll = (e: any) => {
      console.log(e);
    };

    console.log(carousel.current)

    if (carousel.current) {
      carousel.current.addEventListener('scroll:carousel', handleScroll, true);
    }

    return () => {
      // clearTimeout(autoTimeout);
      carousel.current?.removeEventListener('scroll:carousel', handleScroll);
    };
  });

  const handleGoToSection = (event: React.MouseEvent<HTMLAnchorElement>, link?: string) => {
    event.preventDefault();

    console.log(link);
  };
  return (
    <div className="relative flex w-full flex-wrap">
      <div className="carousel-center carousel w-screen" ref={carousel}>
        {dataList.map((comic: T, index: number) =>
          render([comic, index, [id, index + 1].join('-'), 'carousel-item ']),
        )}
      </div>
      <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a
          href={leftLink}
          className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${
            !leftLink || currentBreakPoint < 2 ? ' invisible' : ''
          }`}
          onClick={(e) => handleGoToSection(e, leftLink)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </a>
        <a
          href={rightLink}
          className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${
            !rightLink || currentBreakPoint < 2 ? ' invisible' : ''
          }`}
          onClick={(e) => handleGoToSection(e, rightLink)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
