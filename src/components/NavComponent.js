import React from "react";

import {
  Button,
  Navbar,
  Container,
} from "react-bootstrap";
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
        <Navbar.Brand    className="text-align-center">
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
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
