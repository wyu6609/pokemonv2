import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import { Row, Col } from "react-bootstrap";
import PokemonModal from "./PokemonModal";

const PokemonCollection = ({ pokemon, favorites = [], onToggleFavorite }) => {
  //modal pokemon data
  const [modalData, setModalData] = useState("");
  // pokemon details modal state
  const [modalShow, setModalShow] = useState(false);
  //pokemon set shiny
  const [shiny, setShiny] = useState(false);
  // track selected card
  const [selectedCardId, setSelectedCardId] = useState(null);

  const cards = pokemon.map((poke) => {
    const isFav = favorites.includes(poke.data.id);
    const isSelected = selectedCardId === poke.data.id;
    return (
      <Col
        onClick={() => {
          setModalData(poke);
          setSelectedCardId(poke.data.id);
        }}
        key={poke.data.id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        className="pokemon-col-5"
      >
        <PokemonCard
          setModalShow={setModalShow}
          pokemon={poke}
          isFavorite={isFav}
          onToggleFavorite={onToggleFavorite}
          isSelected={isSelected}
        />
      </Col>
    );
  });

  return (
    <>
      <PokemonModal
        shiny={shiny}
        setShiny={setShiny}
        show={modalShow}
        modaldata={modalData}
        onHide={() => {
          setShiny(false);
          setModalShow(false);
        }}
      />

      <Row className="mx-2 g-3" style={{ paddingBottom: "20px" }}>{cards}</Row>
    </>
  );
};

export default PokemonCollection;
