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
  render: (arg: [T, number, string, string | undefined]) => ReactElement;
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
      const firstItem = carousel.current.querySelector('.carousel-item');
      const firstItemData = firstItem?.getBoundingClientRect();
      const itemWidth = firstItemData?.width || 0;
      const realEndScroll = carousel.current.scrollWidth - windowSize.width;
      let scrollWidth = currentScrollLeft + width;

      if (
        (currentScrollLeft >= realEndScroll - itemWidth / 2 && width > 0) ||
        (width < 0 && scrollWidth <= 0 && currentScrollLeft > itemWidth / 2)
      )
        scrollWidth = itemWidth / 2;
      else if ((currentScrollLeft <= itemWidth / 2 && width < 0) || scrollWidth >= realEndScroll)
        scrollWidth = realEndScroll - itemWidth / 2;

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
    let itemWidth = 0;

    if (firstItem) {
      const firstItemData = firstItem.getBoundingClientRect();
      itemWidth = firstItemData.width;

      carousel.current.scroll({
        left: itemWidth / 2,
        behavior: 'instant',
      });
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
      <div
        className="carousel-center carousel w-screen"
        ref={carousel}
        onWheel={disableAuto}
        onTouchMove={disableAuto}
      >
        {render([dataList[dataList.length - 1], 0, 'carousel-item ', 'before'])}
        {dataList.map((comic: T, index: number) =>
          render([comic, index, 'carousel-item ', undefined]),
        )}
        {render([dataList[0], 0, 'carousel-item ', 'after'])}
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
