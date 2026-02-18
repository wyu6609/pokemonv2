import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import "./PokemonCard.css";
import { formatPokemonId } from "../utils/formatters";

/**
 * PokemonCard Component
 * Displays a Pokemon card with image, name, type, and favorite toggle
 * @param {Object} pokemon - Pokemon data object
 * @param {Function} setModalShow - Callback to open modal
 * @param {boolean} isFavorite - Whether this Pokemon is favorited
 * @param {Function} onToggleFavorite - Callback to toggle favorite status
 * @param {boolean} isSelected - Whether this card is currently selected
 */
const PokemonCard = ({
  pokemon,
  setModalShow,
  isFavorite = false,
  onToggleFavorite,
  isSelected = false,
}) => {
  const [typeColor, setTypeColor] = useState(pokemon.data.types[0].type.name);
  const [isFav, setIsFav] = useState(isFavorite);
  const [front, setFront] = useState(true);

  // Sync isFav with isFavorite prop
  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  // Set color type based on primary type
  useEffect(() => {
    setTypeColor(pokemon.data.types[0].type.name);
  }, [pokemon.data.types]);

  const handleCardClick = () => {
    setFront(!front);
    setModalShow(true);
  };

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    setIsFav(!isFav);
    if (onToggleFavorite) {
      onToggleFavorite(pokemon.data.id);
    }
  };

  return (
    <Card
      size="lg"
      onClick={handleCardClick}
      className={`card shadow pokemon-card border-${typeColor} text-dark ${
        isSelected ? "selected" : ""
      }`}
      style={{ paddingTop: "0.5rem" }}
    >
      <Badge
        pill
        bg="transparent"
        text="dark"
        className="position-absolute top-0 start-0 mt-2 ms-2 pokemon-id-badge"
      >
        {formatPokemonId(pokemon.data.id)}
      </Badge>

      <span
        className="favorite-icon position-absolute top-0 end-0 mt-2 me-2"
        onClick={handleToggleFavorite}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
        style={{ cursor: "pointer" }}
      >
        {isFav ? (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#FFD700" }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
          </svg>
        ) : (
          <svg
            className="info-svg"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
          </svg>
        )}
      </span>

      <Card.Body
        className="p-2 pokemon-image-container"
        style={{ paddingTop: "0.5rem", paddingBottom: "3rem" }}
      >
        <Card.Img
          className="pokemon-image rounded-3"
          variant="top"
          src={
            front
              ? pokemon.data.sprites.front_default
              : pokemon.data.sprites.back_default
          }
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
          alt={`${pokemon.data.name} sprite`}
        />
      </Card.Body>

      <Card.Title
        className={`text-capitalize text-center font-weight-bold pokemon-name-bottom name-${typeColor}`}
      >
        {pokemon.data.name}
      </Card.Title>
    </Card>
  );
};

export default React.memo(PokemonCard);
