import React, { useEffect, useState } from "react";
import "./WordPuzzleComponent.css";
export const WordPuzzleComponent = () => {
  const matrix = [
    ["a", "b", "c", "d", "e", "d", "e", "d", "e"],
    ["f", "g", "h", "i", "j", "d", "e", "d", "e"],
    ["k", "l", "m", "n", "o", "d", "e", "d", "e"],
    ["p", "q", "r", "s", "t", "d", "e", "d", "e"],
    ["y", "u", "v", "w", "x", "d", "e", "d", "e"],
    ["k", "l", "m", "n", "o", "d", "e", "d", "e"],
    ["p", "q", "r", "s", "t", "d", "e", "d", "e"],
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
      // console.log("selecting now");
    } else {
      //console.log("released");
      console.log(selectedLetters.map((x) => x.letter).toString());
      setPath();
      setSelectedLetters([]);
    }
  }, [isSelecting]);

  const addLetterToSelectedWords = (letter) => {
    if (isSelecting) {
      // console.log("selectedLetters!!!", selectedLetters);

      const result = isAlreadySelected(letter.letter);
      // console.log("result!!!", result);

      if (result === false && isConnected(letter)) {
        setSelectedLetters([...selectedLetters, letter]);
      } else {
        setSelectedLetters(
          [...selectedLetters].filter(
            (item) => item.row === letter.row && item.column === letter.column
          )
        );
      }
    }
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
    // console.log("add first letter");
    setSelectedLetters([letter]);
  };

  const isAlreadySelected = (searched) => {
    let found = false;

    if (selectedLetters.length > 0) {
      selectedLetters?.map((element) => {
        if (
          searched.row === element.row &&
          searched.column === element.column
        ) {
          found = true;
        }
      });
      //   console.log("Is alreadey selected for ", searched.letter, found);
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
                          isAlreadySelected(j) === true ? "white" : "rgb(1, 146, 98)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "monospace",
                          fontSize: "2.5rem",
                          color:
                            isAlreadySelected(j) !== true ? "white" : "black",
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
