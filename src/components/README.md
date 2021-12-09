
# Word Search Puzzle

A simple word search puzzle component

[Live-DEMO](https://word-search-puzzle.vercel.app)


[github-page](https://github.com/gurkanucar/word_search_puzzle)

## Example Images

![example](https://github.com/gurkanucar/word_search_puzzle/raw/master/img.png)

![example](https://github.com/gurkanucar/word_search_puzzle/raw/master/img2.png)

![example](https://github.com/gurkanucar/word_search_puzzle/raw/master/img3.png)

## Properties

#### style properties

```  
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
```

#### option properties

```  
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
```
## Usage/Examples

#### import

```javascript
import WordPuzzleComponent from "word-search-puzzle/WordPuzzleComponent";
```

#### variables

```javascript
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
```

#### handle data

```javascript
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
```

#### component

```javascript
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
```
