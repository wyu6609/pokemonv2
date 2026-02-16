import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import PokemonPage from "./PokemonPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [shuffledTracks, setShuffledTracks] = useState([]);
  const [trackChanging, setTrackChanging] = useState(false);

  const tracks = useMemo(
    () => [
      "/sounds/pokemon_littleroot.mp3",
      "/sounds/pokemon_theme.mp3",
      "/sounds/pokemon_center.mp3",
    ],
    [],
  );

  // Shuffle tracks on mount
  useEffect(() => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    setShuffledTracks(shuffled);
  }, [tracks]);

  const currentTrack = shuffledTracks[currentTrackIndex] || tracks[0];

  // Track change animation effect
  useEffect(() => {
    if (shuffledTracks.length > 0) {
      setTrackChanging(true);
      const timer = setTimeout(() => {
        setTrackChanging(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentTrackIndex, shuffledTracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled && shuffledTracks.length > 0) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [audioEnabled, currentTrack, shuffledTracks]);

  // Handle track end - play next track
  const handleTrackEnd = () => {
    if (audioEnabled) {
      playNextTrack();
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audioEnabled) {
        audio.pause();
        setAudioEnabled(false);
      } else {
        audio.play();
        setAudioEnabled(true);
      }
    }
  };

  const playNextTrack = () => {
    if (shuffledTracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % shuffledTracks.length;
    setCurrentTrackIndex(nextIndex);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack}
        key={currentTrack}
        onEnded={handleTrackEnd}
      ></audio>
      <div className="App">
        <div className="pokedex-device">
          <div className="pokedex-controls">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
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
                  onMouseEnter={(e) => (e.target.style.color = "#ffed4e")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
                >
                  POKÉDEX v2.0
                </a>
              </div>

              {/* Audio Controls */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <button
                  className="device-button btn btn-sm"
                  onClick={toggleAudio}
                  title={audioEnabled ? "Mute Audio" : "Unmute Audio"}
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.7rem",
                    minWidth: "32px",
                    height: "28px",
                  }}
                >
                  {audioEnabled ? "🔊" : "🔇"}
                </button>
                <button
                  className="device-button btn btn-sm"
                  onClick={playNextTrack}
                  disabled={shuffledTracks.length === 0}
                  title="Next Track"
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.7rem",
                    minWidth: "32px",
                    height: "28px",
                  }}
                >
                  ⏭️
                </button>

                {/* Track Display Screen */}
                <div
                  style={{
                    background:
                      "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                    border: `2px solid ${trackChanging ? "rgba(0, 255, 255, 0.8)" : "rgba(255, 237, 78, 0.4)"}`,
                    borderRadius: "6px",
                    padding: "8px 12px",
                    boxShadow: trackChanging
                      ? "inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 255, 255, 0.6)"
                      : "inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 237, 78, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                    minWidth: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  {shuffledTracks.length > 0 && audioEnabled && (
                    <span
                      style={{
                        color: trackChanging ? "#00ffff" : "#ffed4e",
                        fontSize: "1.2rem",
                        animation: "blink 1.5s linear infinite",
                        textShadow: trackChanging
                          ? "0 0 15px rgba(0, 255, 255, 1)"
                          : "0 0 10px rgba(255, 237, 78, 0.8)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      ♫
                    </span>
                  )}
                  {!audioEnabled && shuffledTracks.length > 0 && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "1.2rem",
                      }}
                    >
                      ♫
                    </span>
                  )}
                  {!shuffledTracks.length && (
                    <div
                      style={{
                        color: "#666",
                        fontSize: "0.7rem",
                        fontFamily: "monospace",
                      }}
                    >
                      --
                    </div>
                  )}
                </div>
              </div>
            </div>
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
