import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import "./PokemonModal.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PokemonModal = (props) => {
  //set loading
  const [loading, setLoading] = useState(false);
  //set pokemon Description
  const [pokemonDescription, setPokemonDescription] = useState("");
  // set pokemon habitat
  const [pokemonHabitat, setPokemonHabitat] = useState("");

  //shiny state

  const clickHandler = () => {
    props.setShiny(!props.shiny);
  };

  useEffect(() => {
    if (props.modaldata) {
      let URL = props.modaldata.data.species.url;
      console.log(URL);
      fetchDescription(URL);
    }
  }, [props.modaldata]);

  //fetch pokemon description
  const fetchDescription = (URL_ENDPOINT) => {
    axios.get(URL_ENDPOINT).then((response) => {
      let englishDescriptionObj = response.data.flavor_text_entries.find(
        function (obj) {
          return obj.language.name === "en";
        }
      );

      let englishDescription = englishDescriptionObj.flavor_text.replace(
        "\f",
        " "
      );

      setPokemonDescription(englishDescription);

      setPokemonHabitat(
        response.data.habitat ? response.data.habitat.name : "Unknown"
      );

      setLoading(true);
    });
  };

  // Get all stats
  const getStatName = (index) => {
    const statNames = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
    return statNames[index];
  };

  const getStatClass = (index) => {
    const statClasses = ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'];
    return statClasses[index];
  };

  return (
    <>
      {props.modaldata ? (
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={`pokemon-card-modal ${props.modaldata.data.types[0].type.name}-text`}
        >
          <Modal.Header
            className={`${props.modaldata.data.types[0].type.name} text-white modal-header-card`}
            closeButton
          >
            <div className="modal-header-content">
              <Badge className="pokemon-modal-id">{`#${props.modaldata.data.id}`}</Badge>
              <Modal.Title
                className="pokemon-modal-title text-uppercase"
                id="contained-modal-title-vcenter"
              >
                {props.modaldata.data.name}
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className="pokemon-card-body">
            {loading ? (
              <>
                {/* Sprite Display with Shiny Toggle */}
                <div className="sprite-wrapper">
                  <div className="sprite-display">
                    <div className="sprite-side front-sprite">
                      <img
                        alt="Pokemon front view"
                        className="pokemon-sprite"
                        src={
                          props.shiny
                            ? props.modaldata.data.sprites.front_shiny
                            : props.modaldata.data.sprites.front_default
                        }
                      />
                      <span className="sprite-label">Front</span>
                    </div>
                    <div className="sprite-side back-sprite">
                      <img
                        alt="Pokemon back view"
                        className="pokemon-sprite"
                        src={
                          props.shiny
                            ? props.modaldata.data.sprites.back_shiny
                            : props.modaldata.data.sprites.back_default
                        }
                      />
                      <span className="sprite-label">Back</span>
                    </div>
                  </div>
                  <Button
                    variant={props.shiny ? "dark" : "warning"}
                    className="shiny-toggle-btn-modal"
                    onClick={clickHandler}
                    size="sm"
                  >
                    {props.shiny ? "✨ Shiny" : "Normal"}
                  </Button>
                </div>

                {/* Type Badges */}
                <div className="types-section-modal">
                  {props.modaldata.data.types.map((el) => (
                    <Badge
                      key={uuidv4()}
                      className={`type-badge-modal ${el.type.name}`}
                    >
                      {el.type.name}
                    </Badge>
                  ))}
                </div>

                {/* Base Stats Section */}
                <div className="stats-section-modal">
                  <h6 className="stats-header">Base Stats</h6>
                  {props.modaldata.data.stats.map((stat, index) => (
                    <div key={index} className="stat-row-modal">
                      <span className="stat-name-modal">{getStatName(index)}</span>
                      <div className="stat-bar-modal">
                        <div
                          className={`stat-fill-modal ${getStatClass(index)}`}
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value-modal">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>

                {/* Info Section */}
                <div className="info-section-modal">
                  <div className="info-row-modal">
                    <span className="info-label-modal">Height:</span>
                    <span className="info-value-modal">
                      {(props.modaldata.data.height / 10).toFixed(1)} m
                    </span>
                  </div>
                  <div className="info-row-modal">
                    <span className="info-label-modal">Weight:</span>
                    <span className="info-value-modal">
                      {(props.modaldata.data.weight / 10).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="info-row-modal">
                    <span className="info-label-modal">Habitat:</span>
                    <span className="info-value-modal text-capitalize">
                      {pokemonHabitat}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="description-section-modal">
                  <p className="description-text-modal">
                    {pokemonDescription}
                  </p>
                </div>

                {/* Wiki Button */}
                <Button
                  variant="primary"
                  className="wiki-btn-modal"
                  onClick={() => {
                    const url = `https://pokemon.fandom.com/wiki/${props.modaldata.data.name}`;
                    window.open(url, "_blank");
                  }}
                >
                  📖 View on Wiki
                </Button>
              </>
            ) : (
              <div className="text-center py-5">
                <Spinner
                  animation="border"
                  variant="danger"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default PokemonModal;
