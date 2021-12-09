import React, { useEffect, useState } from "react";
import "./WordPuzzleComponent.css";
export const WordPuzzleComponent = (props) => {
  const {
    markedBackgroundColor,
    selectedBackgroundColor,
    hoveredBackgroundColor,
    backgroundColor,
    fontFamily,
    fontWeight,
    fontSize,
    markedForeColor,
    selectedForeColor,
    hoveredForeColor,
    foreColor,
  } = props.design;

  const {
    answerWords,
    matrix,
    isSelecting,
    setIsSelecting,
    availablePaths,
    selectedLetters,
    setSelectedLetters,
    markedLetters,
    setMarkedLetters,
  } = props.options;

  /*const matrix = [
    ["a", "b", "c", "d", "e", "d", "e", "d", "e"],
    ["a", "s", "h", "i", "j", "t", "e", "d", "c"],
    ["a", "g", "m", "n", "o", "r", "e", "d", "i"],
    ["s", "g", "u", "r", "k", "a", "n", "d", "m"],
    ["k", "i", "v", "w", "x", "k", "e", "d", "b"],
    ["i", "k", "m", "n", "o", "y", "e", "d", "o"],
    ["k", "q", "r", "s", "t", "a", "e", "d", "m"],
    ["y", "u", "e", "m", "e", "n", "e", "d", "e"],
  ];*/

  //const answerWords = ["gurkan", "trakya", "deneme", "ask", "cimbom"];
  const [data, setData] = useState([]);
  // const [isSelecting, setIsSelecting] = useState(false);
  // const [selectedLetters, setSelectedLetters] = useState([]);
  // const [markedLetters, setMarkedLetters] = useState([]);
  const [path, setPath] = useState();
  const [hover, setHover] = useState();

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
      const selectedWord = selectedLetters.map((x) => x.letter).join("");
      const result = isAnswer(selectedLetters);
      //console.log(selectedWord);
      //console.log("is answer : ", result);
      setPath();
      setSelectedLetters([]);
    }
  }, [isSelecting]);

  // useEffect(() => {
  //   console.log("marked letters:", markedLetters);
  // }, [markedLetters]);

  const addLetterToSelectedWords = (letter) => {
    if (isSelecting) {
      const result = isSelected(letter);
      const before = selectedLetters.slice(-1)[0];
      if (result === false && isConnected(letter, before)) {
        setSelectedLetters([...selectedLetters, letter]);
      } else {
        const before = selectedLetters.slice(-1)[0];
        if (isBeforeSelect(letter, before)) {
          removeLetterFromList(before);
        }
      }
    }
  };

  const isAnswer = (param) => {
    const selectedWord = param.map((x) => x.letter).join("");
    let found = false;
    for (let i = 0; i < answerWords.length; i++) {
      const element = answerWords[i];
      if (selectedWord === element) {
        found = true;
        markLetters(param);
        break;
      }
    }
    return found;
  };

  const markLetters = (param) => {
    setMarkedLetters(unique([...markedLetters, ...param], ["row", "column"]));
  };

  const unique = (arr, keyProps) => {
    const kvArray = arr.map((entry) => {
      const key = keyProps.map((k) => entry[k]).join("|");
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  };

  const removeLetterFromList = (letter) => {
    const tmp = selectedLetters.filter((element) => {
      return letter.row !== element.row || letter.column !== element.column;
    });
    setSelectedLetters(tmp);
  };

  const isBeforeSelect = (letter, before) => {
    let result = false;
    if (
      (letter.column + 1 === before.column && letter.row === before.row) ||
      (letter.column - 1 === before.column && letter.row === before.row) ||
      (letter.row + 1 === before.row && letter.column === before.column) ||
      (letter.row - 1 === before.row && letter.column === before.column)
    ) {
      result = true;
    }

    return result;
  };

  const isConnected = (letter, before) => {
    let result = false;
    if (selectedLetters.length < 1) {
      result = true;
    } else if (selectedLetters.length === 1 && isBeforeSelect(letter, before)) {
      setPath(chosePath(letter));
      result = true;
    } else {
      if (
        path === "right2left" &&
        isAvailablePath(path) &&
        before.row === letter.row &&
        before.column - 1 === letter.column
      ) {
        result = true;
      } else if (
        path === "left2right" &&
        isAvailablePath(path) &&
        before.row === letter.row &&
        before.column + 1 === letter.column
      ) {
        result = true;
      } else if (
        path === "top2bottom" &&
        isAvailablePath(path) &&
        before.column === letter.column &&
        before.row + 1 === letter.row
      ) {
        result = true;
      } else if (
        path === "bottom2top" &&
        isAvailablePath(path) &&
        before.column === letter.column &&
        before.row - 1 === letter.row
      ) {
        result = true;
      } else {
        result = false;
        setSelectedLetters([]);
      }
    }
    return result;
  };

  const chosePath = (item) => {
    let result = "left2right";
    const lastLetter = selectedLetters.slice(-2)[0];
    const letter = item !== undefined ? item : selectedLetters.slice(-1)[0];
    if (
      lastLetter.row === letter.row &&
      lastLetter.column - 1 === letter.column
    ) {
      result = "right2left";
    } else if (
      lastLetter.row === letter.row &&
      lastLetter.column + 1 === letter.column
    ) {
      result = "left2right";
    } else if (
      lastLetter.column === letter.column &&
      lastLetter.row + 1 === letter.row
    ) {
      result = "top2bottom";
    } else if (
      lastLetter.column === letter.column &&
      lastLetter.row - 1 === letter.row
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

  const isAvailablePath = (searched) => {
    let found = false;

    if (availablePaths.length > 0) {
      for (let i = 0; i < availablePaths.length; i++) {
        const element = availablePaths[i];
        if (searched === element) {
          found = true;
          break;
        }
      }
    }

    return found;
  };

  const isMarked = (searched) => {
    let found = false;

    if (markedLetters.length > 0) {
      for (let i = 0; i < markedLetters.length; i++) {
        const element = markedLetters[i];
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
                      onMouseLeave={() => setHover()}
                      onMouseEnter={() => {
                        addLetterToSelectedWords(j);
                        setHover(j);
                      }}
                      onMouseDown={() => {
                        addFirstLetter(j);
                        setIsSelecting(true);
                      }}
                      onMouseUp={() => setIsSelecting(false)}
                      className="letter-wrapper"
                      style={{
                        backgroundColor:
                          isMarked(j) === true
                            ? markedBackgroundColor
                            : isSelected(j) === true
                            ? selectedBackgroundColor
                            : j === hover
                            ? hoveredBackgroundColor
                            : backgroundColor,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "monospace", //fontFamily,
                          fontSize: fontSize,
                          color:
                            isMarked(j) === true
                              ? markedForeColor
                              : isSelected(j) === true
                              ? selectedForeColor
                              : j === hover
                              ? hoveredForeColor
                              : foreColor,
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
