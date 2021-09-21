import { createContext, useContext } from "react";
import useFavorites from "../useFavorites";
const favoritesContext = createContext();

export function ProvideFavorites({ children, user }) {
  const fav = useFavorites(user);
  return (
    <favoritesContext.Provider value={fav}>
      {children}
    </favoritesContext.Provider>
  );
}

export function useFav() {
  return useContext(favoritesContext);
}
