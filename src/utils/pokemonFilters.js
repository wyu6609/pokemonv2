/**
 * Pokemon Filtering Utilities
 * Functions for filtering and searching Pokemon
 */

/**
 * Filters Pokemon by type (checks both primary and secondary types)
 * @param {Array} pokemonList - List of Pokemon objects
 * @param {string} type - The type to filter by
 * @returns {Array} Filtered Pokemon list
 */
export const filterByType = (pokemonList, type) => {
  if (!type || type === "all") {
    return pokemonList;
  }
  return pokemonList.filter((pokemon) =>
    pokemon.data.types.some((typeObj) => typeObj.type.name === type),
  );
};

/**
 * Searches Pokemon by name or ID
 * @param {Array} pokemonList - List of Pokemon objects
 * @param {string} searchTerm - The search term (name or ID)
 * @returns {Array} Filtered Pokemon list
 */
export const searchPokemon = (pokemonList, searchTerm) => {
  if (!searchTerm) {
    return pokemonList;
  }

  const term = searchTerm.toLowerCase().trim();

  return pokemonList.filter((pokemon) => {
    const name = pokemon.data.name.toLowerCase();
    const id = pokemon.data.id.toString();

    return name.includes(term) || id.includes(term);
  });
};

/**
 * Applies both type filter and search to Pokemon list
 * @param {Array} pokemonList - List of Pokemon objects
 * @param {string} type - The type to filter by
 * @param {string} searchTerm - The search term
 * @returns {Array} Filtered and searched Pokemon list
 */
export const filterAndSearchPokemon = (pokemonList, type, searchTerm) => {
  let result = filterByType(pokemonList, type);
  result = searchPokemon(result, searchTerm);
  return result;
};

/**
 * Paginates a Pokemon list
 * @param {Array} pokemonList - List of Pokemon objects
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Object containing paginated data and metadata
 */
export const paginatePokemon = (pokemonList, currentPage, itemsPerPage) => {
  const totalItems = pokemonList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = pokemonList.slice(startIndex, endIndex);

  return {
    items,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
  };
};
