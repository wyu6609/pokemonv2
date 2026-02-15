import React, { useRef, useEffect, useState } from "react";
import "./Search.css";
import { FormControl, Dropdown, Container } from "react-bootstrap";

// Capitalize First letter
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Search = ({ searchTerm, onChangeSearch, setStatus, status }) => {
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  //search input function
  const handleChange = (event) => {
    onChangeSearch(event.target.value);
  };

  // Update cursor position when text changes
  useEffect(() => {
    if (inputRef.current) {
      const textWidth = getTextWidth(searchTerm, '0.95rem Share Tech Mono, monospace');
      setCursorPosition(textWidth + 15); // 15px is the padding-left
    }
  }, [searchTerm]);

  // Function to measure text width
  const getTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  };

  //status Handler
  const statusHandler = (type) => {
    setStatus(type.toLowerCase());
  };

  const typeList = [
    "all",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];

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
          <span className="terminal-cursor" style={{ left: `${cursorPosition}px` }}>█</span>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className={`${status} text-uppercase dropdown-btn`}
            id="dropdown-split-basic"
          >
            {capitalizeFirstLetter(status)}
          </Dropdown.Toggle>

          <Dropdown.Menu className="text-uppercase font-weight-bold dropdown-menu-custom">
            {typeList.map((type) => (
              <Dropdown.Item
                key={type}
                className={`${type}-text-search`}
                onClick={() => statusHandler(type)}
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
