import React from "react";
import classNames from "classnames";
import { replaceUnderscore } from "../../../helpers";

export default function FilterTab(props) {
  const { category, values, selectedValue, onSelect } = props;

  return (
    <div className="favorite-filter-item">
      <div className="favorite-filter-tab-label">
        <span>{replaceUnderscore(category)}</span>
      </div>
      <ul className="favorite-filter-tab-list">
        {values.map((value, index) => {
          const selectedClass = classNames({
            "tab-item-selected": value === selectedValue,
          });
          return (
            <li
              key={index}
              className={selectedClass}
              onClick={() => onSelect(category, value)}
            >
              <span>{replaceUnderscore(value)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
