import React from "react";
import TabItemList from "./TabItemList";
import SwiperItem from "./SwiperItem";
import useSwiper from "../../../hooks/useSwiper";
import useScroller from "../../../hooks/useScroller";

import "../../../styles/swiper.css";

export default function Swiper(props) {
  const { tab } = props;
  const { selectedTag, data, onChange } = useSwiper(tab);
  const { dimension, ref, onScroll } = useScroller(data);
  const { positionX, overflowX, barwidth } = dimension;

  return (
    <div className="swiper-item-container">
      <TabItemList tab={tab} selectedTag={selectedTag} onChange={onChange} />
      <div className="overflow-container">
        <div
          className="overflow-box"
          style={{ left: overflowX }}
          ref={ref.overflow}
        >
          {data &&
            data.map(
              (source, index) =>
                source.poster_path && <SwiperItem source={source} key={index} />
            )}
        </div>
      </div>
      <div className="scrollbar-container" ref={ref.barContainer}>
        <span
          className="scrollbar"
          style={{
            width: barwidth,
            left: positionX,
          }}
          onMouseDown={onScroll}
        />
      </div>
    </div>
  );
}
