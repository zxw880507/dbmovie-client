import React from "react";
import classNames from "classnames";
import { tagFormatting } from "../../../helpers";

export default function TabItem(props) {
  const { selected, value, onChange } = props;

  const tabSelectedClass = classNames("tab-item", {
    "tab-item-selected": selected,
  });
  return (
    <li className={tabSelectedClass} onClick={() => onChange(value)}>
      <p>{tagFormatting(value)}</p>
    </li>
  );
}
