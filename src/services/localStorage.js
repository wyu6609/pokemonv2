/**
 * Local Storage Service
 * Manages persistent storage for user preferences
 */

const STORAGE_KEYS = {
  FAVORITES: "pokemonFavorites",
};

/**
 * Gets favorites from local storage
 * @returns {Array<number>} Array of favorite Pokemon IDs
 */
export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
};

/**
 * Saves favorites to local storage
 * @param {Array<number>} favorites - Array of favorite Pokemon IDs
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

/**
 * Adds a Pokemon to favorites
 * @param {number} pokemonId - The Pokemon ID to add
 * @returns {Array<number>} Updated favorites array
 */
export const addFavorite = (pokemonId) => {
  const favorites = getFavorites();
  if (!favorites.includes(pokemonId)) {
    const updated = [...favorites, pokemonId];
    saveFavorites(updated);
    return updated;
  }
  return favorites;
};

/**
 * Removes a Pokemon from favorites
 * @param {number} pokemonId - The Pokemon ID to remove
 * @returns {Array<number>} Updated favorites array
 */
export const removeFavorite = (pokemonId) => {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== pokemonId);
  saveFavorites(updated);
  return updated;
};

/**
 * Toggles a Pokemon's favorite status
 * @param {number} pokemonId - The Pokemon ID to toggle
 * @returns {Array<number>} Updated favorites array
 */
export const toggleFavorite = (pokemonId) => {
  const favorites = getFavorites();
  if (favorites.includes(pokemonId)) {
    return removeFavorite(pokemonId);
  } else {
    return addFavorite(pokemonId);
  }
};

/**
 * Checks if a Pokemon is favorited
 * @param {number} pokemonId - The Pokemon ID to check
 * @returns {boolean} True if favorited
 */
export const isFavorite = (pokemonId) => {
  const favorites = getFavorites();
  return favorites.includes(pokemonId);
};
