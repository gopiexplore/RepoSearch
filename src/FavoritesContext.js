import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (repo) => {
    setFavorites((prev) => [...prev, repo]);
  };

  const removeFavorite = (repo) => {
    setFavorites((prev) => prev.filter((item) => item.id !== repo.id));
  };

  const isFavorite = (repo) => {
    return favorites.some((item) => item.id === repo.id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
