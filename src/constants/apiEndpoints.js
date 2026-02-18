/**
 * API Endpoints Constants
 * Centralized location for all external API endpoints
 */

export const POKEAPI_ENDPOINTS = {
  BASE_URL: "https://pokeapi.co/api/v2",
  POKEMON_LIST: "https://pokeapi.co/api/v2/pokemon?limit=10000", // All Pokemon including forms
  getPokemonSpecies: (id) => `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
};

export const EXTERNAL_URLS = {
  POKEAPI_HOME: "https://pokeapi.co/",
  POKEMON_FANDOM_BASE: "https://pokemon.fandom.com/wiki",
  getPokemonTypeUrl: (typeName) =>
    `https://pokemon.fandom.com/wiki/${typeName}_type`,
  getPokemonWikiUrl: (pokemonName) =>
    `https://pokemon.fandom.com/wiki/${pokemonName}`,
  POKEMON_LOGO:
    "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg",
  GITHUB_REPO: "https://github.com/wyu6609/pokemonv2",
  GITHUB_PROFILE: "https://github.com/wyu6609",
  LINKEDIN_PROFILE: "https://www.linkedin.com/in/will-yu-56b101a8/",
};
