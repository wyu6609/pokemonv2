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
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#ffffff',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(220, 53, 69, 0.6)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontFamily: "'Arial Black', 'Impact', sans-serif"
          }}>
            POKÉDEX v2.0
          </div>
          <a 
            href="https://github.com/wyu6609/pokemonv2"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              padding: '8px 16px',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              fontFamily: "'Arial', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            github.com/wyu6609/pokemonv2
          </a>
        </div>,
        {
          containerId: 'center-toast',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'pokedex-title-toast',
          toastId: "pokedex-title",
        },
      );

      // Music toast - top center
      toast.info(
        "🔇 Music is muted. Click the speaker button to enjoy Pokemon background music!",
        {
          containerId: 'top-toast',
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
              <div className="cli-header">
                <a
                  href="https://pokeapi.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cli-link"
                >
                  <span className="cli-prompt">$</span>
                  <span className="cli-text">pokedex</span>
                  <span className="cli-version">--version 2.0</span>
                  <span className="cli-cursor">_</span>
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
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto'
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
