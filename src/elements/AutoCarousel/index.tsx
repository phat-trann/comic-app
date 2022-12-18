import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '~/hooks';
import ChevronLeft from '~/icons/ChevronLeft';
import ChevronRight from '~/icons/ChevronRight';

const ArrowLink = ({
  onClick,
  isForward = false,
  isMobile,
  children,
}: {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>, isForward?: boolean) => void;
  isForward?: boolean;
  isMobile: boolean;
  children: JSX.Element;
}) => (
  <a
    className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${isMobile ? ' invisible' : ''}`}
    onClick={(event) => onClick(event, isForward)}
  >
    {children}
  </a>
);

const Carousel = <T,>({
  id,
  dataList,
  render,
  autoScroll = false,
  autoScrollTime = 2,
}: {
  id: string;
  dataList: T[];
  render: (arg: [T, number, string, string]) => ReactElement;
  autoScroll?: boolean;
  autoScrollTime?: number;
}) => {
  const carousel = useRef<HTMLDivElement | null>(null);
  const isTrigger = useRef<boolean>(false);
  const [windowSize, currentBreakPoint, breakPointConfig] = useWindowSize();
  const isMobile = currentBreakPoint < breakPointConfig['md'];

  const scrollCarousel = (width: number) => {
    if (carousel.current) {
      const currentScrollLeft = carousel.current.scrollLeft;
      const currentScrollTop = carousel.current.scrollTop;

      carousel.current.scroll(currentScrollLeft + width, currentScrollTop);
    }
  };

  const triggerScroll = (event?: React.MouseEvent<HTMLAnchorElement>, isForward?: boolean) => {
    event && event.preventDefault();

    scrollCarousel(isForward ? -windowSize.width : windowSize?.width);
    isTrigger.current = true;
  };

  useEffect(() => {
    const items = carousel.current?.querySelectorAll('.carousel-item');
    const firstItem = items?.[0];
    let itemWidth = 0;

    if (firstItem) {
      const firstItemData = firstItem.getBoundingClientRect();
      itemWidth = firstItemData.width;
    }

    if (autoScroll) {
      const autoScrollInterval = setInterval(() => {
        if (isTrigger.current === true) {
          isTrigger.current = false;
          return;
        }
        scrollCarousel(itemWidth);
      }, autoScrollTime * 1000);

      return () => clearInterval(autoScrollInterval);
    }
  }, []);

  return (
    <div className="relative flex w-full flex-wrap">
      <div className="carousel-center carousel w-screen" ref={carousel}>
        {dataList.map((comic: T, index: number) =>
          render([comic, index, [id, index].join('-'), 'carousel-item ']),
        )}
      </div>
      <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <ArrowLink isMobile={isMobile} isForward={true} onClick={triggerScroll}>
          <ChevronLeft />
        </ArrowLink>
        <ArrowLink isMobile={isMobile} onClick={triggerScroll}>
          <ChevronRight />
        </ArrowLink>
      </div>
    </div>
  );
};

export default Carousel;
