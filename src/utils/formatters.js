/**
 * String Formatting Utilities
 * Common string transformation functions
 */

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Pads a number with leading zeros
 * @param {number} num - The number to pad
 * @param {number} size - The desired length (default: 4)
 * @returns {string} The padded string
 */
export const padWithZeros = (num, size = 4) => {
  return String(num).padStart(size, "0");
};

/**
 * Formats Pokemon ID with leading zeros and hash
 * @param {number} id - The Pokemon ID
 * @returns {string} Formatted ID (e.g., "#0025")
 */
export const formatPokemonId = (id) => {
  return `#${padWithZeros(id, 4)}`;
};

/**
 * Converts decimeters to meters
 * @param {number} decimeters - Height in decimeters
 * @returns {number} Height in meters
 */
export const decimetersToMeters = (decimeters) => {
  return (decimeters * 0.1).toFixed(1);
};

/**
 * Converts hectograms to kilograms
 * @param {number} hectograms - Weight in hectograms
 * @returns {number} Weight in kilograms
 */
export const hectogramsToKilograms = (hectograms) => {
  return (hectograms * 0.1).toFixed(1);
};

/**
 * Formats stat name for display
 * @param {string} statName - The stat name from API
 * @returns {string} Formatted stat name
 */
export const formatStatName = (statName) => {
  const statMap = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return statMap[statName] || capitalizeFirstLetter(statName);
};

/**
 * Formats ability name by replacing hyphens with spaces
 * @param {string} abilityName - The ability name from API
 * @returns {string} Formatted ability name
 */
export const formatAbilityName = (abilityName) => {
  return abilityName.split("-").map(capitalizeFirstLetter).join(" ");
};
