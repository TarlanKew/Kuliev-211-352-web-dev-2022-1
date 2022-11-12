const container = document.getElementById("gameContainer")
const squareArray = []
let nextMove = "X"

function gameOver(message) {
  document.getElementById("winner").innerHTML = message;
  container.style.display = "none";
  document.getElementById("gameOver").style.display = "block";
}

function isDraw() {
  let shouldReturn = true;
  squareArray.forEach(({ state }) => { if (state == "") shouldReturn = false });
  return shouldReturn;
}

function wonGame() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squareArray[a].state !== "" &&
      squareArray[a].state === squareArray[b].state &&
      squareArray[a].state === squareArray[c].state
    ) {
      return true;
    }
  }
  return false;
}

class ClassSquare {
  constructor(element, index) {
    this.element = element
    this.index = index
    this.state = ""
  }
  clicked() {
    this.state = nextMove
    this.element.classList.remove("notClicked")
    this.element.onclick = () => { return false }
    this.element.querySelector("p").innerHTML = this.state;
    if (wonGame()) return gameOver("the winner is player " + this.state)
    if (isDraw()) return gameOver("it is a draw")
    nextMove == "X" ? (nextMove = "O") : (nextMove = "X")
  }
}

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div")
  div.classList.add("square", "notClicked")

  const square = new ClassSquare(div, i)
  div.onclick = () => { square.clicked() }

  div.appendChild(document.createElement("p"))
  container.appendChild(div)
  squareArray.push(square)
}