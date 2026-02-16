import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import PokemonCollection from "./PokemonCollection";

import { Spinner } from "react-bootstrap";

const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=1302";

const PokemonPage = () => {
  //set pokemon state
  const [pokemon, setPokemon] = useState([]);
  //set loading

  const [loading, setLoading] = useState(false);
  //set search term
  const [searchTerm, setSearchTerm] = useState("");

  // set filter status
  const [status, setStatus] = useState("all");

  //pokemon type filter state
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // favorites state
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("pokemonFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  // save favorites to localStorage
  const saveFavoritesToStorage = (favs) => {
    localStorage.setItem("pokemonFavorites", JSON.stringify(favs));
  };

  const toggleFavorite = (pokemonId) => {
    const newFavorites = favorites.includes(pokemonId)
      ? favorites.filter((id) => id !== pokemonId)
      : [...favorites, pokemonId];
    setFavorites(newFavorites);
    saveFavoritesToStorage(newFavorites);
  };

  //filter pokemon type handler
  const filterHandler = () => {
    switch (status) {
      case "bug":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "bug"),
        );
        break;
      case "dark":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "dark"),
        );
        break;
      case "dragon":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "dragon"),
        );
        break;
      case "electric":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "electric"),
        );
        break;
      case "fairy":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "fairy"),
        );
        break;
      case "fighting":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "fighting"),
        );
        break;
      case "fire":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "fire"),
        );
        break;
      case "flying":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "flying"),
        );
        break;
      case "ghost":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "ghost"),
        );
        break;
      case "grass":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "grass"),
        );
        break;
      case "ground":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "ground"),
        );
        break;
      case "ice":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "ice"),
        );
        break;
      case "normal":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "normal"),
        );
        break;
      case "poison":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "poison"),
        );
        break;
      case "psychic":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "psychic"),
        );
        break;
      case "rock":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "rock"),
        );
        break;
      case "steel":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "steel"),
        );
        break;
      case "water":
        setFilteredPokemon(
          pokemon.filter((poke) => poke.data.types[0].type.name === "water"),
        );
        break;
      default:
        setFilteredPokemon(pokemon);
        break;
    }
  };

  //axios fetch

  const fetchPokemons = () => {
    axios.get(URL_ENDPOINT).then((response) => {
      let urlArr = response.data.results.map((el) => el.url);

      axios.all(urlArr.map((l) => axios.get(l))).then(
        axios.spread(function (...res) {
          // all requests are now complete
          setPokemon(res);
          setLoading(true);
        }),
      );
    });
  };

  //fetch call on component load
  useEffect(() => {
    fetchPokemons();
  }, []);

  // pokemon type component load
  useEffect(() => {
    filterHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon, status]);

  //filter Pokemon by search
  const allFilteredPokemon = filteredPokemon.filter(
    (poke) =>
      poke.data.id === parseInt(searchTerm) ||
      poke.data.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalFiltered = allFilteredPokemon.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);

  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pokemonsToDisplay = allFilteredPokemon.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, status]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="device-content">
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
            onToggleFavorite={toggleFavorite}
          />
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="device-button pagination-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ‹ Prev
              </button>

              <div className="page-numbers">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="page-ellipsis">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`device-button pagination-btn page-number ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                className="device-button pagination-btn"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next ›
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="d-flex align-items-center my-auto">
          <Spinner
            style={{ width: "10", height: "10" }}
            animation="border"
            variant="danger"
            className="mx-auto"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
