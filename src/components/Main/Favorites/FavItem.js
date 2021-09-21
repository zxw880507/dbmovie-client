import React, { useState } from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import classNames from "classnames";

export default function FavItem(props) {
  const { source, removeFavorites } = props;
  const [isRemoved, setIsRemoved] = useState(false);
  const imgClass = classNames("favorite-img-box", {
    "item-removed": isRemoved,
  });
  return (
    <div className="favorite-item-container">
      <div className={imgClass}>
        <img
          src={`https://image.tmdb.org/t/p/w500${source.poster_path}`}
          alt=""
          className="favorite-img"
        />
        <button
          className="favorite-icon-btn"
          onClick={() => {
            setIsRemoved(true);
            setTimeout(() => removeFavorites(source), 800);
          }}
        >
          <RemoveCircleIcon className="remove-icon" />
        </button>
      </div>
      <div className="favorite-item-title-box">
        <p className="favorite-item-title">{source.title || source.name}</p>
        <p className="favorite-item-release">
          {source.release_date || source.first_air_date}
        </p>
      </div>
    </div>
  );
}
