/**
 * Pokemon Constants
 * Static data and configuration for Pokemon application
 */

export const POKEMON_TYPES = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 24,
  DEFAULT_PAGE: 1,
  MAX_PAGES_TO_SHOW: 5,
};

export const AUDIO_CONFIG = {
  TRACKS: [
    "/sounds/pokemon_littleroot.mp3",
    "/sounds/pokemon_theme.mp3",
    "/sounds/pokemon_center.mp3",
  ],
  DEFAULT_VOLUME: 1.0,
};

export const APP_CONFIG = {
  VERSION: "v2.0",
  NAME: "POKÉDEX",
};
