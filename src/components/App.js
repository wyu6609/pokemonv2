import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import NavComponent from "./NavComponent";
import PokemonPage from "./PokemonPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("/sounds/pokemon_theme.mp3");

  const tracks = ["/sounds/pokemon_theme.mp3", "/sounds/pokemon_center.mp3"];

  // Get random track
  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [audioEnabled, currentTrack]);

  // Handle track end - play next random track
  const handleTrackEnd = () => {
    if (audioEnabled) {
      const nextTrack = getRandomTrack();
      setCurrentTrack(nextTrack);
    }
  };

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
        src={currentTrack}
        key={currentTrack}
        onEnded={handleTrackEnd}
        onLoadedMetadata={() => setAudioEnabled(true)}
      ></audio>
      <div className="App">
        <div className="pokedex-device">
          <div className="pokedex-controls">
            <div className="device-info">
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => e.target.style.color = "#ffed4e"}
                onMouseLeave={(e) => e.target.style.color = "#ffffff"}
              >
                POKÉDEX v2.0
              </a>
            </div>
            <button
              className="device-button btn btn-sm"
              onClick={toggleAudio}
              title={audioEnabled ? "Mute Audio" : "Enable Audio"}
              style={{ padding: "8px 12px", fontSize: "0.8rem" }}
            >
              {audioEnabled ? "🔊 AUDIO" : "🔇 AUDIO"}
            </button>
          </div>
          <div className="pokedex-screen">
            <PokemonPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
