import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import classNames from "classnames";
import { useFav } from "../../../hooks/providers/Favorites";
import { useAuth } from "../../../hooks/providers/Auth";

export default function SwiperItem(props) {
  const { source } = props;

  const { isAuth } = useAuth().authState;
  const { favoritesList, favorIt } = useFav();

  const selected = favoritesList.map((el) => el.id).includes(source.id);
  const iconClass = classNames("fav-icon", {
    selected: selected,
  });

  return (
    <div className="overflow-item-container">
      <div className="overflow-img-box">
        <img
          src={`https://image.tmdb.org/t/p/w500${source.poster_path}`}
          alt=""
          className="overflow-img"
        />
        {isAuth && (
          <button
            className="overflow-img-fav"
            onClick={() => favorIt(selected, source)}
          >
            <FavoriteIcon className={iconClass} />
          </button>
        )}
      </div>
      <div className="overflow-item-title-box">
        <p className="overflow-item-title">{source.title || source.name}</p>
        <p className="overflow-item-release">
          {source.release_date || source.first_air_date}
        </p>
      </div>
    </div>
  );
}
