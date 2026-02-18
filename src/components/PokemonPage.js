import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import PokemonCollection from "./PokemonCollection";
import Pagination from "./Pagination";

const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=1302";

const PokemonPage = () => {
  // Ref for scroll container
  const scrollContainerRef = useRef(null);

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
            onToggleFavorite={toggleFavorite}
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
