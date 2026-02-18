/**
 * Pokemon API Service
 * Handles all API calls to PokeAPI
 */

import axios from "axios";
import { POKEAPI_ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Fetches the list of all Pokemon
 * @returns {Promise<Array>} Promise resolving to Pokemon list
 */
export const fetchPokemonList = async () => {
  try {
    const response = await axios.get(POKEAPI_ENDPOINTS.POKEMON_LIST);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

/**
 * Fetches detailed data for a single Pokemon
 * @param {string} url - The Pokemon detail URL
 * @returns {Promise<Object>} Promise resolving to Pokemon data
 */
export const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon details from ${url}:`, error);
    throw error;
  }
};

/**
 * Fetches detailed data for multiple Pokemon in batches to avoid overwhelming the network
 * @param {Array<string>} urls - Array of Pokemon detail URLs
 * @param {number} batchSize - Number of requests per batch (default: 100)
 * @param {number} delayMs - Delay between batches in milliseconds (default: 50)
 * @returns {Promise<Array>} Promise resolving to array of Pokemon data
 */
export const fetchMultiplePokemonDetails = async (
  urls,
  batchSize = 100,
  delayMs = 50,
) => {
  try {
    const results = [];

    // Process URLs in batches
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchPromises = batch.map((url) =>
        axios.get(url).catch((error) => {
          console.error(`Failed to fetch ${url}:`, error.message);
          return null; // Return null for failed requests instead of failing everything
        }),
      );

      const batchResults = await Promise.all(batchPromises);
      // Filter out null results (failed requests)
      const validResults = batchResults.filter((result) => result !== null);
      results.push(...validResults);

      // Log progress for large datasets
      if (urls.length > 500) {
        console.log(`Loaded ${results.length}/${urls.length} Pokemon...`);
      }

      // Small delay between batches to be nice to the API
      if (i + batchSize < urls.length) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    console.log(`Successfully loaded ${results.length} Pokemon!`);
    return results;
  } catch (error) {
    console.error("Error fetching multiple Pokemon details:", error);
    throw error;
  }
};

/**
 * Fetches Pokemon species data
 * @param {number} pokemonId - The Pokemon ID
 * @returns {Promise<Object>} Promise resolving to species data
 */
export const fetchPokemonSpecies = async (pokemonId) => {
  try {
    const response = await axios.get(
      POKEAPI_ENDPOINTS.getPokemonSpecies(pokemonId),
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching species data for Pokemon ${pokemonId}:`,
      error,
    );
    throw error;
  }
};
