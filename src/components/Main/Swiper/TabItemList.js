import React from "react";
import TabItem from "./TabItem";

export default function TabItemList(props) {
  const { tab, selectedTag, onChange } = props;
  const { title, tags } = tab;

  return (
    <div className="tab-container">
      <h4 className="tab-container-title">{title}</h4>
      <ul className="tab-list">
        {tags.map((el, index) => (
          <TabItem
            key={index}
            selected={selectedTag === el}
            value={el}
            onChange={onChange}
          />
        ))}
      </ul>
    </div>
  );
}
