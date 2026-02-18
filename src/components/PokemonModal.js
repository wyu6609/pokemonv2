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
  // set capture rate
  const [captureRate, setCaptureRate] = useState(0);
  // set gender ratio
  const [genderRatio, setGenderRatio] = useState(null);
  // set generation
  const [generation, setGeneration] = useState("");
  // set is legendary/mythical
  const [isLegendary, setIsLegendary] = useState(false);
  const [isMythical, setIsMythical] = useState(false);

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

      // Set capture rate
      setCaptureRate(response.data.capture_rate);

      // Set gender ratio (-1 means genderless)
      setGenderRatio(response.data.gender_rate);

      // Set generation
      const genName = response.data.generation.name;
      setGeneration(genName.replace("generation-", "").toUpperCase());

      // Set legendary/mythical status
      setIsLegendary(response.data.is_legendary);
      setIsMythical(response.data.is_mythical);

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

  // Calculate catch probability
  const getCatchProbability = (captureRate) => {
    // Simplified calculation (full health, standard pokeball, no status)
    const probability = ((captureRate / 3) / 255) * 100;
    return probability.toFixed(1);
  };

  // Get difficulty label for capture rate
  const getCatchDifficulty = (captureRate) => {
    if (captureRate >= 200) return { label: "Very Easy", class: "very-easy" };
    if (captureRate >= 120) return { label: "Easy", class: "easy" };
    if (captureRate >= 75) return { label: "Medium", class: "medium" };
    if (captureRate >= 45) return { label: "Hard", class: "hard" };
    if (captureRate >= 20) return { label: "Very Hard", class: "very-hard" };
    return { label: "Extremely Hard", class: "extreme" };
  };

  // Get gender ratio percentages
  const getGenderRatios = (genderRate) => {
    if (genderRate === -1) return { male: 0, female: 0, genderless: true };
    const femalePercent = (genderRate / 8) * 100;
    const malePercent = 100 - femalePercent;
    return { male: malePercent, female: femalePercent, genderless: false };
  };

  // Type effectiveness chart
  const typeChart = {
    normal: { weaknesses: ['fighting'], resistances: [], immunities: ['ghost'] },
    fire: { weaknesses: ['water', 'ground', 'rock'], resistances: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immunities: [] },
    water: { weaknesses: ['electric', 'grass'], resistances: ['fire', 'water', 'ice', 'steel'], immunities: [] },
    electric: { weaknesses: ['ground'], resistances: ['electric', 'flying', 'steel'], immunities: [] },
    grass: { weaknesses: ['fire', 'ice', 'poison', 'flying', 'bug'], resistances: ['water', 'electric', 'grass', 'ground'], immunities: [] },
    ice: { weaknesses: ['fire', 'fighting', 'rock', 'steel'], resistances: ['ice'], immunities: [] },
    fighting: { weaknesses: ['flying', 'psychic', 'fairy'], resistances: ['bug', 'rock', 'dark'], immunities: [] },
    poison: { weaknesses: ['ground', 'psychic'], resistances: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immunities: [] },
    ground: { weaknesses: ['water', 'grass', 'ice'], resistances: ['poison', 'rock'], immunities: ['electric'] },
    flying: { weaknesses: ['electric', 'ice', 'rock'], resistances: ['grass', 'fighting', 'bug'], immunities: ['ground'] },
    psychic: { weaknesses: ['bug', 'ghost', 'dark'], resistances: ['fighting', 'psychic'], immunities: [] },
    bug: { weaknesses: ['fire', 'flying', 'rock'], resistances: ['grass', 'fighting', 'ground'], immunities: [] },
    rock: { weaknesses: ['water', 'grass', 'fighting', 'ground', 'steel'], resistances: ['normal', 'fire', 'poison', 'flying'], immunities: [] },
    ghost: { weaknesses: ['ghost', 'dark'], resistances: ['poison', 'bug'], immunities: ['normal', 'fighting'] },
    dragon: { weaknesses: ['ice', 'dragon', 'fairy'], resistances: ['fire', 'water', 'electric', 'grass'], immunities: [] },
    dark: { weaknesses: ['fighting', 'bug', 'fairy'], resistances: ['ghost', 'dark'], immunities: ['psychic'] },
    steel: { weaknesses: ['fire', 'fighting', 'ground'], resistances: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immunities: ['poison'] },
    fairy: { weaknesses: ['poison', 'steel'], resistances: ['fighting', 'bug', 'dark'], immunities: ['dragon'] }
  };

  // Calculate combined type effectiveness
  const getTypeEffectiveness = () => {
    if (!props.modaldata) return { weaknesses: [], resistances: [], immunities: [] };
    
    const types = props.modaldata.data.types.map(t => t.type.name);
    let allWeaknesses = [];
    let allResistances = [];
    let allImmunities = [];

    types.forEach(type => {
      if (typeChart[type]) {
        allWeaknesses.push(...typeChart[type].weaknesses);
        allResistances.push(...typeChart[type].resistances);
        allImmunities.push(...typeChart[type].immunities);
      }
    });

    // Remove duplicates and immunities from weaknesses/resistances
    const weaknesses = [...new Set(allWeaknesses)].filter(w => !allImmunities.includes(w));
    const resistances = [...new Set(allResistances)].filter(r => !allImmunities.includes(r));
    const immunities = [...new Set(allImmunities)];

    // Remove overlapping weaknesses/resistances (they cancel out for dual types)
    const finalWeaknesses = weaknesses.filter(w => !resistances.includes(w));
    const finalResistances = resistances.filter(r => !weaknesses.includes(r));

    return {
      weaknesses: finalWeaknesses,
      resistances: finalResistances,
      immunities: immunities
    };
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
              {(isLegendary || isMythical) && (
                <Badge className="special-badge">
                  {isMythical ? '✨ Mythical' : '👑 Legendary'}
                </Badge>
              )}
            </div>
          </Modal.Header>
          <Modal.Body className="pokemon-card-body">
            {loading ? (
              <>
                {/* LEFT COLUMN - Visual & Primary Info */}
                <div className="modal-left-column">
                  {/* Generation & Base Experience Badge */}
                  <div className="quick-info-badges">
                    <Badge className="gen-badge">Gen {generation}</Badge>
                    <Badge className="exp-badge">
                      Base EXP: {props.modaldata.data.base_experience || 'N/A'}
                    </Badge>
                  </div>

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

                  {/* Abilities Section */}
                  <div className="abilities-section-modal">
                    <h6 className="section-header-modal">Abilities</h6>
                    <div className="abilities-list-modal">
                      {props.modaldata.data.abilities.map((ability) => (
                        <Badge
                          key={uuidv4()}
                          className={`ability-badge-modal ${ability.is_hidden ? 'hidden-ability' : ''}`}
                        >
                          {ability.ability.name.replace(/-/g, ' ')}
                          {ability.is_hidden && <span className="hidden-tag"> (Hidden)</span>}
                        </Badge>
                      ))}
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
                </div>

                {/* RIGHT COLUMN - Stats & Battle Info */}
                <div className="modal-right-column">
                  {/* Capture Rate & Gender Section */}
                  <div className="capture-gender-section-modal">
                    <div className="capture-subsection-modal">
                      <h6 className="section-header-modal">Catch Rate</h6>
                      <div className="capture-info-modal">
                        <div className="capture-bar-wrapper-modal">
                          <div
                            className={`capture-bar-fill-modal ${getCatchDifficulty(captureRate).class}`}
                            style={{ width: `${(captureRate / 255) * 100}%` }}
                          ></div>
                        </div>
                        <div className="capture-details-modal">
                          <span className={`capture-difficulty-modal ${getCatchDifficulty(captureRate).class}`}>
                            {getCatchDifficulty(captureRate).label}
                          </span>
                          <span className="capture-probability-modal">
                            ~{getCatchProbability(captureRate)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="gender-subsection-modal">
                      <h6 className="section-header-modal">Gender Ratio</h6>
                      {getGenderRatios(genderRatio).genderless ? (
                        <div className="genderless-text-modal">Genderless</div>
                      ) : (
                        <div className="gender-bar-wrapper-modal">
                          <div
                            className="gender-bar-male-modal"
                            style={{ width: `${getGenderRatios(genderRatio).male}%` }}
                          >
                            {getGenderRatios(genderRatio).male > 15 && (
                              <span>♂ {getGenderRatios(genderRatio).male.toFixed(0)}%</span>
                            )}
                          </div>
                          <div
                            className="gender-bar-female-modal"
                            style={{ width: `${getGenderRatios(genderRatio).female}%` }}
                          >
                            {getGenderRatios(genderRatio).female > 15 && (
                              <span>♀ {getGenderRatios(genderRatio).female.toFixed(0)}%</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Type Effectiveness Section */}
                  <div className="type-effectiveness-section-modal">
                    <h6 className="section-header-modal">Type Effectiveness</h6>
                    
                    {getTypeEffectiveness().weaknesses.length > 0 && (
                      <div className="effectiveness-row-modal">
                        <span className="effectiveness-label-modal weakness-label">Weak To:</span>
                        <div className="effectiveness-types-modal">
                          {getTypeEffectiveness().weaknesses.map((type) => (
                            <Badge key={type} className={`type-badge-small-modal ${type}`}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {getTypeEffectiveness().resistances.length > 0 && (
                      <div className="effectiveness-row-modal">
                        <span className="effectiveness-label-modal resistance-label">Resists:</span>
                        <div className="effectiveness-types-modal">
                          {getTypeEffectiveness().resistances.map((type) => (
                            <Badge key={type} className={`type-badge-small-modal ${type}`}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {getTypeEffectiveness().immunities.length > 0 && (
                      <div className="effectiveness-row-modal">
                        <span className="effectiveness-label-modal immunity-label">Immune To:</span>
                        <div className="effectiveness-types-modal">
                          {getTypeEffectiveness().immunities.map((type) => (
                            <Badge key={type} className={`type-badge-small-modal ${type}`}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
                </div>
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
