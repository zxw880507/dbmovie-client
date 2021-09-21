import { useState, useEffect, useRef } from "react";

export default function useScroller(data) {
  const overflow = useRef(null);
  const barContainer = useRef(null);
  const ref = { overflow, barContainer };
  const [dimension, setDimension] = useState({
    positionX: 0,
    overflowX: 0,
    barwidth: undefined,
  });
  useEffect(() => {
    let newBarWidth = overflow.current.offsetWidth
      ? (overflow.current.parentNode.offsetWidth *
          barContainer.current.offsetWidth) /
        overflow.current.offsetWidth
      : 0;
    setDimension((prev) => ({ ...prev, barwidth: newBarWidth }));
  }, [data]);

  const onScroll = (e) => {
    const outerX = barContainer.current.offsetLeft;
    const x = e.pageX - outerX - e.target.offsetLeft;
    const maxPos = barContainer.current.offsetWidth - e.target.offsetWidth;
    //get overflow accessible moving distance
    const overflowDist =
      overflow.current.offsetWidth - overflow.current.parentNode.offsetWidth;

    const move = (e) => {
      let newPositionX = e.pageX - outerX - x;
      if (newPositionX > maxPos) {
        newPositionX = maxPos;
      }
      if (newPositionX < 0) {
        newPositionX = 0;
      }
      let newOverflowX = (-newPositionX * overflowDist) / maxPos;

      setDimension((prev) => ({
        ...prev,
        positionX: newPositionX,
        overflowX: newOverflowX,
      }));
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });
  };

  return { dimension, ref, onScroll };
}
