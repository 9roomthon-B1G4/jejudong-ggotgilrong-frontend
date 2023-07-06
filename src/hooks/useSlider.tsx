import { useRef, useState } from 'react';

const SCROLL_SIZE = {
  top: -450,
  minTop: -400,
  minBottom: 50,
};

export interface ReactContextValueProps {
  isDragging: boolean;
  tabPosition: number;
  handleShowController: (arg1: boolean) => void;
  handleTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: () => void;
}

const useSlider = () => {
  // 드래그 슬라이드 관련
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [tabPosition, setTabPosition] = useState(0);
  const currentPositionRef = useRef<number>(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartY(event.touches[0].clientY);
    currentPositionRef.current = tabPosition;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (Number(document.querySelector('.contentsBox')?.scrollTop) === 0) {
      if (isDragging) {
        const dragDistance = event.touches[0].clientY - dragStartY;
        const distance = currentPositionRef.current + dragDistance;
        if (distance <= 0) {
          if (tabPosition >= SCROLL_SIZE.top) setTabPosition(distance);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // 맥스 사이즈일때

    if (tabPosition <= SCROLL_SIZE.minTop) {
      setTabPosition(SCROLL_SIZE.top);
    }
  };

  const contextValue = {
    isDragging,
    tabPosition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };

  return contextValue;
};

export default useSlider;