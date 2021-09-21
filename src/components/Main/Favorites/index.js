import React, { useState } from "react";
import "../../../styles/favorites.css";
import FilterTab from "./FilterTab";
import FavItem from "./FavItem";
import { useFav } from "../../../hooks/providers/Favorites";
import { filterMedia } from "../../../helpers";

const tabs = {
  media_type: ["movie", "TV", "all"],
  sort_by: ["name", "release_date"],
  order: ["asc", "desc"],
};
export default function Favorites() {
  const { favoritesList, removeFavorites } = useFav();
  const [filters, setFilters] = useState({
    media_type: "all",
    sort_by: "name",
    order: "asc",
  });

  const onSelect = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="favorite-main-container">
      <div className="favorite-head-img" />
      <div className="favorite-header">
        <h1>Favorite List</h1>
        <div className="favorite-filter-list">
          {Object.keys(tabs).map((category, index) => (
            <FilterTab
              key={index}
              category={category}
              values={tabs[category]}
              selectedValue={filters[category]}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="favorite-list-grid">
        {filterMedia(favoritesList, filters).map((source) => (
          <FavItem
            key={source.id}
            source={source}
            removeFavorites={removeFavorites}
          />
        ))}
        <HiddenBox />
      </div>
    </div>
  );
}

function HiddenBox() {
  return (
    <>
      {[...new Array(12).keys()].map((el, index) => (
        <div key={index} className="favorite-item-container hidden"></div>
      ))}
    </>
  );
}
