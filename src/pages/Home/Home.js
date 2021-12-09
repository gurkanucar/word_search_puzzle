import React, { useState, useEffect } from "react";
import { WordPuzzleComponent } from "../../components/WordPuzzleComponent";
import "./Home.css";

export const Home = () => {
  const answerWords = ["gurkan", "example", "project", "github", "npm"];

  const [found, setFound] = useState([]);

  const matrix = [
    ["p", "g", "i", "t", "h", "u", "b", "t", "e"],
    ["r", "s", "n", "p", "m", "e", "e", "e", "c"],
    ["o", "g", "m", "n", "o", "x", "q", "s", "i"],
    ["j", "g", "u", "r", "k", "a", "n", "t", "m"],
    ["e", "i", "v", "w", "x", "m", "e", "y", "b"],
    ["c", "k", "m", "n", "o", "p", "v", "d", "o"],
    ["t", "q", "r", "s", "t", "l", "b", "a", "m"],
    ["y", "t", "e", "s", "t", "e", "e", "t", "e"],
  ];

  const [isSelecting, setIsSelecting] = useState(false);

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [markedLetters, setMarkedLetters] = useState([]);

  useEffect(() => {
    if (isSelecting) {
      console.log("selected");
    } else {
      console.log("released");
      const selectedWord = selectedLetters.map((x) => x.letter).join("");
      console.log(selectedWord);
      addToFound(selectedWord);
    }
  }, [isSelecting]);

  const isInList = (searched, arr) => {
    let found = false;

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (searched === element) {
        found = true;
        break;
      }
    }

    return found;
  };

  const addToFound = (founded) => {
    if (isInList(founded, answerWords)) {
      if (!isInList(founded, found)) {
        setFound([...found, founded]);
        console.log(founded);
      }
    }
  };

  useEffect(() => {
    console.log("marked letters:", markedLetters);
  }, [markedLetters]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {answerWords.map((element) => {
          return (
            <span
              style={{
                marginTop: 50,
                marginLeft: 20,
                marginRight: 20,
                color: "black",
              }}
            >
              <h2
                style={{
                  textDecoration: isInList(element, found)
                    ? "line-through"
                    : "none",
                }}
              >
                {element}
              </h2>
            </span>
          );
        })}
      </div>
      <WordPuzzleComponent
        design={{
          markedBackgroundColor: "#00C3FF",
          selectedBackgroundColor: "white",
          hoveredBackgroundColor: "rgb(0, 218, 145)",
          backgroundColor: "rgb(1, 146, 98)",
          fontFamily: "monospace",
          fontWeight: "",
          fontSize: "2.5rem",
          markedForeColor: "white",
          selectedForeColor: "rgb(1, 146, 98)",
          hoveredForeColor: "white",
          foreColor: "white",
        }}
        options={{
          answerWords: answerWords,
          matrix: matrix,
          isSelecting: isSelecting,
          selectedLetters: selectedLetters,
          setSelectedLetters: setSelectedLetters,
          markedLetters: markedLetters,
          setMarkedLetters: setMarkedLetters,
          setIsSelecting: setIsSelecting,
          availablePaths: [
            // "right2left",
            "left2right",
            "top2bottom",
            //"bottom2top",
          ],
        }}
      />
    </div>
  );
};
