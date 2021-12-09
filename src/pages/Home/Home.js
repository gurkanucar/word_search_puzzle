import React, { useState, useEffect } from "react";
import { WordPuzzleComponent } from "../../components/WordPuzzleComponent";
import "./Home.css";

export const Home = () => {
  const answerWords = ["gurkan", "example"];
  const matrix = [
    ["a", "b", "c", "d", "e", "g", "x", "t", "e"],
    ["a", "s", "h", "i", "j", "e", "e", "e", "c"],
    ["a", "g", "m", "n", "o", "x", "q", "s", "i"],
    ["s", "g", "u", "r", "k", "a", "n", "t", "m"],
    ["k", "i", "v", "w", "x", "m", "e", "y", "b"],
    ["i", "k", "m", "n", "o", "p", "v", "d", "o"],
    ["k", "q", "r", "s", "t", "l", "b", "a", "m"],
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
    }
  }, [isSelecting]);

  useEffect(() => {
    console.log("marked letters:", markedLetters);
  }, [markedLetters]);

  return (
    <div>
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
