import React, { ReactElement, useEffect, useRef } from 'react';
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
  dataList,
  render,
  autoScroll = false,
  autoScrollTime = 2,
}: {
  dataList: T[];
  render: (arg: [T, number, string]) => ReactElement;
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
      const realEndScroll = carousel.current.scrollWidth - windowSize.width;
      let scrollWidth = currentScrollLeft + width;

      if (currentScrollLeft >= realEndScroll && width > 0) scrollWidth = 0;
      else if (currentScrollLeft <= 0 && width < 0) scrollWidth = realEndScroll;

      carousel.current.scroll(scrollWidth, currentScrollTop);
    }
  };

  const triggerScroll = (event?: React.MouseEvent<HTMLAnchorElement>, isForward?: boolean) => {
    event && event.preventDefault();

    scrollCarousel(isForward ? -windowSize.width : windowSize?.width);
    isTrigger.current = true;
  };

  const disableAuto = () => (isTrigger.current = true);

  useEffect(() => {
    if (!carousel.current) return;
    const firstItem = carousel.current.querySelector('.carousel-item');
    const firstItemData = firstItem?.getBoundingClientRect();
    const itemWidth = firstItemData?.width;

    if (autoScroll && itemWidth) {
      const autoScrollInterval = setInterval(() => {
        if (isTrigger.current === true) {
          isTrigger.current = false;
          return;
        }
        scrollCarousel(itemWidth);
      }, autoScrollTime * 1000);

      return () => clearInterval(autoScrollInterval);
    }
  }, [dataList, windowSize.width]);

  return (
    <div className="relative flex w-full flex-wrap">
      <div
        className="carousel w-screen"
        ref={carousel}
        onWheel={disableAuto}
        onTouchMove={disableAuto}
      >
        {dataList.map((comic: T, index: number) => render([comic, index, 'carousel-item ']))}
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
