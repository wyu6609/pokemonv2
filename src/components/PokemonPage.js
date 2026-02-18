import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import PokemonCollection from "./PokemonCollection";
import Pagination from "./Pagination";
import {
  fetchPokemonList,
  fetchMultiplePokemonDetails,
} from "../services/pokemonApi";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteService,
} from "../services/localStorage";
import {
  filterByType,
  searchPokemon,
  paginatePokemon,
} from "../utils/pokemonFilters";
import { PAGINATION_CONFIG } from "../constants/pokemon";

/**
 * PokemonPage Component
 * Main page component that displays Pokemon list with search, filter, and pagination
 */
const PokemonPage = () => {
  // Ref for scroll container
  const scrollContainerRef = useRef(null);

  // State management
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    PAGINATION_CONFIG.DEFAULT_PAGE,
  );
  const [favorites, setFavorites] = useState(getFavorites);

  // Favorites management
  const handleToggleFavorite = (pokemonId) => {
    const newFavorites = toggleFavoriteService(pokemonId);
    setFavorites(newFavorites);
  };

  // Fetch Pokemon data
  const loadPokemonData = async () => {
    try {
      const pokemonList = await fetchPokemonList();
      const urls = pokemonList.map((el) => el.url);
      const responses = await fetchMultiplePokemonDetails(urls);
      setPokemon(responses);
      setLoading(true);
    } catch (error) {
      console.error("Error loading Pokemon data:", error);
      setLoading(true);
    }
  };

  // Load Pokemon on component mount
  useEffect(() => {
    loadPokemonData();
  }, []);

  // Filter Pokemon by type when pokemon list or status changes
  useEffect(() => {
    const filtered = filterByType(pokemon, status);
    setFilteredPokemon(filtered);
  }, [pokemon, status]);

  // Apply search filter and get paginated results
  const searchedPokemon = searchPokemon(filteredPokemon, searchTerm);
  const {
    items: pokemonsToDisplay,
    totalItems: totalFiltered,
    totalPages,
    startIndex,
    endIndex,
  } = paginatePokemon(
    searchedPokemon,
    currentPage,
    PAGINATION_CONFIG.ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(PAGINATION_CONFIG.DEFAULT_PAGE);
  }, [searchTerm, status]);

  // Scroll to top when page changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div className="device-content" ref={scrollContainerRef}>
      <Search
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        setStatus={setStatus}
        status={status}
      />
      {loading ? (
        <>
          <div className="mt-3 mx-4">
            <small
              className="text-muted pokemon-count-text"
              style={{ color: "#cccccc", fontSize: "0.85rem" }}
            >
              Showing {startIndex + 1}-{Math.min(endIndex, totalFiltered)} of{" "}
              {totalFiltered} Pokémon
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </small>
          </div>
          <PokemonCollection
            className="mt-2"
            pokemon={pokemonsToDisplay}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="pokedex-loader-container">
          <div className="pokedex-loader">
            <div className="pokeball-loader">
              <svg viewBox="0 0 100 100" className="pokeball-svg">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#dc3545"
                  className="pokeball-top"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="white"
                  className="pokeball-bottom"
                />
                <rect x="0" y="45" width="100" height="10" fill="#1a1a1a" />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="white"
                  stroke="#1a1a1a"
                  strokeWidth="3"
                />
                <circle cx="50" cy="50" r="8" fill="#ffd700" />
              </svg>
            </div>
            <div className="loader-text">
              <span className="loading-dots">Searching Pokédex</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
