import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import { EXTERNAL_URLS } from "../constants/apiEndpoints";

/**
 * NavComponent
 * Navigation bar with Pokemon logo and audio toggle button
 * @param {Function} onToggleAudio - Callback for audio toggle
 * @param {boolean} audioEnabled - Whether audio is enabled
 */
const NavComponent = ({ onToggleAudio, audioEnabled }) => {
  return (
    <Navbar
      bg="danger"
      variant="dark"
      className="shadow "
      key={false}
      expand={false}
    >
      <Container className="justify-content-center">
        <Navbar.Brand className="text-align-center">
          <a href={EXTERNAL_URLS.POKEAPI_HOME} target="_blank" rel="noreferrer">
            <img
              src={EXTERNAL_URLS.POKEMON_LOGO}
              width="90%"
              height="50px"
              alt="Pokemon logo"
            />
          </a>
        </Navbar.Brand>
        <Button
          variant="light"
          size="sm"
          onClick={onToggleAudio}
          style={{
            marginLeft: "auto",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={audioEnabled ? "Mute" : "Unmute"}
        >
          {audioEnabled ? "🔊" : "🔇"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavComponent;
