import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import NavComponent from "./NavComponent";
import PokemonPage from "./PokemonPage";
import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        // Audio will need user interaction to play
      });
    }
  }, [audioEnabled]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setAudioEnabled(true);
      } else {
        audio.pause();
        setAudioEnabled(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/pokemon_theme.mp3"
        loop
        onLoadedMetadata={() => setAudioEnabled(true)}
      ></audio>
      <NavComponent onToggleAudio={toggleAudio} audioEnabled={audioEnabled} />
      <PokemonPage />
    </>
  );
}

export default App;
