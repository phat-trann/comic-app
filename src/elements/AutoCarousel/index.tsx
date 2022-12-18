import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '~/hooks';
import ChevronLeft from '~/icons/ChevronLeft';
import ChevronRight from '~/icons/ChevronRight';

const ArrowLink = ({
  onClick,
  link,
  isMobile,
  children,
}: {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>, link?: number) => void;
  link?: number;
  isMobile: boolean;
  children: JSX.Element;
}) => (
  <a
    className={`btn-circle btn pointer-events-auto h-8 min-h-0 w-8${isMobile ? ' invisible' : ''}`}
    onClick={(event) => onClick(event, link)}
  >
    {children}
  </a>
);

const Carousel = <T,>({
  id,
  dataList,
  render,
}: {
  id: string;
  dataList: T[];
  render: (arg: [T, number, string, string]) => ReactElement;
}) => {
  const [leftLink, setLeftLink] = useState<number>(0);
  const [rightLink, setRightLink] = useState<number>(0);
  const carousel = useRef<HTMLDivElement | null>(null);
  const [windowSize, currentBreakPoint, breakPointConfig] = useWindowSize();
  const isMobile = currentBreakPoint < breakPointConfig['md'];

  const dataCarousel = (): [number, (arg: number) => number] => {
    const items = carousel.current?.querySelectorAll('.carousel-item');
    const firstItem = items?.[0];

    if (!firstItem) return [-1, (number: number) => number];

    const firstItemData = firstItem.getBoundingClientRect();
    const itemWidth = firstItemData.width;
    const itemInScreen = Math.floor(windowSize?.width ? windowSize.width / itemWidth : 0);
    const maxNumber = (currentNumber: number) => {
      if (currentNumber === -1) return items.length - 1;
      return currentNumber <= items.length - 1 ? currentNumber : items.length - 1;
    };

    return [itemInScreen, maxNumber];
  };

  const handleScroll = () => {
    const items = carousel.current?.querySelectorAll('.carousel-item');

    if (!items) return;

    const [itemInScreen, maxNumber] = dataCarousel();

    for (const [index, item] of items.entries()) {
      if (item) {
        const data = item.getBoundingClientRect();

        if (data.x < 0) continue;
        if (index === 0) {
          setLeftLink(maxNumber(-1));
          setRightLink(maxNumber(itemInScreen * 2 - 2));
          break;
        }
        setLeftLink(index - itemInScreen + 1 > 0 ? index - itemInScreen + 1 : 0);
        setRightLink(maxNumber(itemInScreen * 2 + index - 3));
        break;
      }
    }

    const lastItemData = items[items.length - 1].getBoundingClientRect();

    if (windowSize?.width && windowSize?.width - lastItemData.x - lastItemData.width > 0)
      setRightLink(0);
  };

  const handleGoToSection = (event?: React.MouseEvent<HTMLAnchorElement>, link?: number) => {
    event && event.preventDefault();

    const currentItem = document.querySelector(`#${[id, link].join('-')}`);
    currentItem && currentItem.scrollIntoView();
  };

  useEffect(() => {
    const [itemInScreen, maxNumber] = dataCarousel();
    setLeftLink(maxNumber(-1));
    setRightLink(maxNumber(itemInScreen * 2 - 3));
  }, []);

  return (
    <div className="relative flex w-full flex-wrap">
      <div className="carousel-center carousel w-screen" ref={carousel} onScroll={handleScroll}>
        {dataList.map((comic: T, index: number) =>
          render([comic, index, [id, index].join('-'), 'carousel-item ']),
        )}
      </div>
      <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <ArrowLink isMobile={isMobile} link={leftLink} onClick={handleGoToSection}>
          <ChevronLeft />
        </ArrowLink>
        <ArrowLink isMobile={isMobile} link={rightLink} onClick={handleGoToSection}>
          <ChevronRight />
        </ArrowLink>
      </div>
    </div>
  );
};

export default Carousel;
