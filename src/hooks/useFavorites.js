import { useState, useEffect } from "react";
import axios from "axios";
import { dropMedium } from "../helpers";

export default function useFavorites(user) {
  const [favoritesList, setFavoritesList] = useState([]);

  const addFavorites = (source) => {
    axios
      .post("/user/favorites", { user, source })
      .then(() => setFavoritesList((prev) => [...prev, source]));
  };
  const removeFavorites = (source) => {
    axios
      .delete("/user/favorites", { data: { user, source } })
      .then(() => setFavoritesList((prev) => dropMedium(prev, source)));
  };

  const favorIt = (selected, source) => {
    if (!selected) {
      addFavorites(source);
    } else {
      removeFavorites(source);
    }
  };
  useEffect(() => {
    if (user) {
      axios
        .get("/user/favorites", {
          params: { userId: user.userId },
        })
        .then((res) => {
          setFavoritesList(res.data);
        });
    }
  }, [user]);

  return { favoritesList, setFavoritesList, removeFavorites, favorIt };
}
