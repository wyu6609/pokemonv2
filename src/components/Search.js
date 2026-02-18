import React, { useRef, useEffect, useState } from "react";
import "./Search.css";
import { FormControl, Dropdown, Container } from "react-bootstrap";
import { POKEMON_TYPES } from "../constants/pokemon";
import { capitalizeFirstLetter } from "../utils/formatters";

const SEARCH_INPUT_FONT = "0.95rem Share Tech Mono, monospace";
const SEARCH_INPUT_PADDING_LEFT = 15;

/**
 * Search Component
 * Provides search input and type filter dropdown for Pokemon
 * @param {string} searchTerm - Current search term
 * @param {Function} onChangeSearch - Callback for search term changes
 * @param {Function} setStatus - Callback for type filter changes
 * @param {string} status - Current type filter status
 */
const Search = ({ searchTerm, onChangeSearch, setStatus, status }) => {
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleChange = (event) => {
    onChangeSearch(event.target.value);
  };

  // Update cursor position when text changes
  useEffect(() => {
    if (inputRef.current) {
      const textWidth = getTextWidth(searchTerm, SEARCH_INPUT_FONT);
      setCursorPosition(textWidth + SEARCH_INPUT_PADDING_LEFT);
    }
  }, [searchTerm]);

  // Function to measure text width
  const getTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  };

  const handleTypeSelect = (type) => {
    setStatus(type.toLowerCase());
  };

  return (
    <Container className="sticky-top">
      <div className="search-wrapper my-4 mx-lg-5 mx-sm-5 shadow">
        <div className="search-input-wrapper">
          <FormControl
            ref={inputRef}
            placeholder="> search_pokemon --id=<id> --name=<name>"
            aria-label="Search Pokemon"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <span
            className="terminal-cursor"
            style={{ left: `${cursorPosition}px` }}
          >
            █
          </span>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className={`${status} text-uppercase dropdown-btn`}
            id="dropdown-split-basic"
          >
            {capitalizeFirstLetter(status)}
          </Dropdown.Toggle>

          <Dropdown.Menu 
            className="text-uppercase font-weight-bold dropdown-menu-custom"
            popperConfig={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            }}
          >
            {POKEMON_TYPES.map((type) => (
              <Dropdown.Item
                key={type}
                className={`${type}-text-search`}
                onClick={() => handleTypeSelect(type)}
              >
                {capitalizeFirstLetter(type)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
};

export default Search;
