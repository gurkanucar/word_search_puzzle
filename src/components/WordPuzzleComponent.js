import React, { useEffect, useState } from "react";
import "./WordPuzzleComponent.css";
export const WordPuzzleComponent = () => {
  const matrix = [
    ["a", "b", "c", "d", "e", "d", "e", "d", "e"],
    ["f", "g", "h", "i", "j", "t", "e", "d", "e"],
    ["k", "l", "m", "n", "o", "r", "e", "d", "e"],
    ["p", "g", "u", "r", "k", "a", "n", "d", "e"],
    ["y", "u", "v", "w", "x", "k", "e", "d", "e"],
    ["k", "l", "m", "n", "o", "y", "e", "d", "e"],
    ["p", "q", "r", "s", "t", "a", "e", "d", "e"],
    ["y", "u", "v", "w", "x", "d", "e", "d", "e"],
  ];

  const [isSelecting, setIsSelecting] = useState(false);

  const [data, setData] = useState([]);

  const [selectedLetters, setSelectedLetters] = useState([]);

  const [path, setPath] = useState();

  useEffect(() => {
    const tmp = matrix.map((row, i) => {
      return row.map((column, j) => {
        return {
          letter: column,
          row: i,
          column: j,
        };
      });
    });
    setData(tmp);
  }, []);

  useEffect(() => {
    if (isSelecting) {
    } else {
      console.log(selectedLetters.map((x) => x.letter).toString());
      setPath();
      setSelectedLetters([]);
    }
  }, [isSelecting]);

  useEffect(() => {
    console.log(selectedLetters.map((x) => x.letter).toString());
  }, [selectedLetters]);

  const addLetterToSelectedWords = (letter) => {
    if (isSelecting) {
      const result = isSelected(letter);
      console.log(
        "add letter to selected words",
        letter.letter,
        "is exists",
        result
      );
      if (result === false) {
        if (isConnected(letter)) {
          setSelectedLetters([...selectedLetters, letter]);
        }
      } else {
        const before = selectedLetters.slice(-1)[0];
        if (
          (letter.column + 1 === before.column && letter.row === before.row) ||
          (letter.column - 1 === before.column && letter.row === before.row) ||
          (letter.row + 1 === before.row && letter.column === before.column) ||
          (letter.row - 1 === before.row && letter.column === before.column)
        ) {
          console.log("before", before, "last", letter);
          removeLetterFromList(before);
        }
      }
    }
  };

  const removeLetterFromList = (letter) => {
    const tmp = selectedLetters.filter((element) => {
      return letter.row !== element.row || letter.column !== element.column;
    });
    setSelectedLetters(tmp);
  };

  const isConnected = (letter) => {
    let result = false;

    if (selectedLetters.length < 1) {
      result = true;
    } else if (selectedLetters.length === 1) {
      console.log(chosenPath(letter));
      setPath(chosenPath(letter));
      result = true;
    } else {
      const lastLetter = selectedLetters.slice(-1)[0];
      console.log(lastLetter, letter);
      //   lastLetter.row - 1 === letter.row ||
      //   lastLetter.row + 1 === letter.row ||
      // lastLetter.column - 1 === letter.column ||
      //       lastLetter.column + 1 === letter.column ||

      if (
        path === "right2left" &&
        lastLetter.row === letter.row &&
        lastLetter.column > letter.column
      ) {
        result = true;
      } else if (
        path === "left2right" &&
        lastLetter.row === letter.row &&
        lastLetter.column < letter.column
      ) {
        result = true;
      } else if (
        path === "top2bottom" &&
        lastLetter.column === letter.column &&
        lastLetter.row < letter.row
      ) {
        result = true;
      } else if (
        path === "bottom2top" &&
        lastLetter.column === letter.column &&
        lastLetter.row > letter.row
      ) {
        result = true;
      } else {
        setSelectedLetters([]);
      }
    }
    return result;
  };

  const chosenPath = (item) => {
    let result = "right2left";
    const lastLetter = selectedLetters.slice(-2)[0];
    const letter = item !== undefined ? item : selectedLetters.slice(-1)[0];
    if (lastLetter.row === letter.row && lastLetter.column > letter.column) {
      result = "right2left";
    } else if (
      lastLetter.row === letter.row &&
      lastLetter.column < letter.column
    ) {
      result = "left2right";
    } else if (
      lastLetter.column === letter.column &&
      lastLetter.row < letter.row
    ) {
      result = "top2bottom";
    } else if (
      lastLetter.column === letter.column &&
      lastLetter.row > letter.row
    ) {
      result = "bottom2top";
    }

    return result;
  };

  const addFirstLetter = (letter) => {
    setSelectedLetters([letter]);
  };

  const isSelected = (searched) => {
    let found = false;

    if (selectedLetters.length > 0) {
      for (let i = 0; i < selectedLetters.length; i++) {
        const element = selectedLetters[i];
        if (
          searched.row === element.row &&
          searched.column === element.column
        ) {
          found = true;
          break;
        }
      }
    }

    return found;
  };

  return (
    <div className="root">
      <table onMouseLeave={() => setIsSelecting(false)}>
        <tbody>
          {data.map((i, row) => {
            return (
              <tr>
                {i.map((j, column) => {
                  return (
                    <td
                      onMouseEnter={() => addLetterToSelectedWords(j)}
                      onMouseDown={() => {
                        addFirstLetter(j);
                        setIsSelecting(true);
                      }}
                      onMouseUp={() => setIsSelecting(false)}
                      className="letter-wrapper"
                      style={{
                        backgroundColor:
                          isSelected(j) === true ? "white" : "rgb(1, 146, 98)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "monospace",
                          fontSize: "2.5rem",
                          color: isSelected(j) !== true ? "white" : "black",
                        }}
                      >
                        {j.letter}
                      </h3>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
