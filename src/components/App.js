import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import PokemonPage from "./PokemonPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
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

  // Initialize with tracks in order for first play
  useEffect(() => {
    setShuffledTracks([...tracks]);
  }, [tracks]);

  const currentTrack = shuffledTracks[currentTrackIndex] || tracks[0];

  // Auto-play whenever track changes and audio is enabled
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled && shuffledTracks.length > 0) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [audioEnabled, currentTrack, shuffledTracks]);

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

  // Show title toast notification on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      // Title toast - center center
      toast(
        <div className="toast-content-wrapper">
          <div className="toast-title-wrapper">
            <span className="toast-title">POKÉDEX</span>
            <span className="toast-version">v2.0</span>
          </div>
          <a
            href="https://github.com/wyu6609/pokemonv2"
            target="_blank"
            rel="noopener noreferrer"
            className="toast-repo-link"
          >
            <svg
              className="toast-repo-icon"
              viewBox="0 0 16 16"
              width="14"
              height="14"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            <span className="toast-repo-text">wyu6609/pokemonv2</span>
          </a>
          <div className="toast-divider"></div>
          <div className="toast-connect-label">CONNECT WITH ME</div>
          <div className="toast-social-links">
            <a
              href="https://github.com/wyu6609"
              target="_blank"
              rel="noopener noreferrer"
              className="toast-social-link"
              title="GitHub Profile"
            >
              <svg
                className="toast-social-icon"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
              <span className="toast-social-text">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/will-yu-56b101a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="toast-social-link"
              title="LinkedIn Profile"
            >
              <svg
                className="toast-social-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  fill="currentColor"
                />
              </svg>
              <span className="toast-social-text">LinkedIn</span>
            </a>
          </div>
        </div>,
        {
          containerId: "center-toast",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          className: "pokedex-title-toast",
          toastId: "pokedex-title",
        },
      );

      // Music toast - top center
      toast.info(
        "🔇 Music is muted. Click the speaker button to enjoy Pokemon background music!",
        {
          containerId: "top-toast",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          toastId: "music-toast",
        },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle track end - play next track
  const handleTrackEnd = () => {
    if (audioEnabled) {
      playNextTrack();
      // Shuffle tracks after first track for variety
      if (currentTrackIndex === 0) {
        setTimeout(() => {
          const shuffled = [...tracks].sort(() => Math.random() - 0.5);
          setShuffledTracks(shuffled);
        }, 100);
      }
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
            <div className="controls-wrapper">
              <div className="pokedex-header">
                <div className="pokedex-indicator"></div>
                <a
                  href="https://pokeapi.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pokedex-title-link"
                >
                  <span className="pokedex-title">POKÉDEX</span>
                  <span className="pokedex-version">v2.0</span>
                </a>
              </div>

              {/* Audio Controls */}
              <div className="audio-controls">
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
      <ToastContainer
        enableMultiContainer
        containerId="center-toast"
        position="top-center"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
        }}
      />
      <ToastContainer
        enableMultiContainer
        containerId="top-toast"
        position="top-center"
      />
    </>
  );
}

export default App;
