let boxes = document.querySelectorAll(".box"); // Selects all elements with the class "box" and assigns them to the variable "boxes"
let newGame = document.querySelector("#new-btn"); // Selects the element with the ID "new-btn" and assigns it to the variable "newGame"
let msgCon = document.querySelector(".masseg-container"); // Selects the element with the class "masseg-container" and assigns it to the variable "msgCon"
let origunalContent = newGame.innerText; // Stores the original text content of the "newGame" button

let turnO = true; // Variable to track the current turn (true for O, false for X)

// All possible winning patterns
const winPatterns = [
  [0, 1, 2], // Horizontal top row
  [0, 3, 6], // Vertical left column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [1, 4, 7], // Vertical middle column
  [2, 5, 6], // Vertical right column
  [2, 4, 6], // Diagonal from top-right to bottom-left
  [3, 4, 5], // Horizontal middle row
  [6, 7, 8], // Horizontal bottom row
];

// Adds a click event listener to each game cell
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked"); // Logs a message to the console when a cell is clicked
    newGame.innerText = "Reset"; // Changes the text of the "newGame" button to "Reset"
    if (turnO) {
      // If it's player O's turn
      msgCon.innerHTML = "X turn"; // Displays "X turn" in the message container
      msgCon.style.color = "red"; // Changes the message color to red
      box.innerText = "O"; // Sets the text of the clicked cell to "O"
      box.style.color = "red"; // Changes the cell text color to red
      turnO = false; // Switches the turn to player X
    } else {
      // If it's player X's turn
      msgCon.innerHTML = "O turn"; // Displays "O turn" in the message container
      msgCon.style.color = "green"; // Changes the message color to green
      box.innerText = "X"; // Sets the text of the clicked cell to "X"
      box.style.color = "green"; // Changes the cell text color to green
      turnO = true; // Switches the turn to player O
    }
    box.disabled = true; // Disables the clicked cell
    checkWinner(); // Checks if there's a winner after each move
  });
});

// Function to check for a winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText; // Gets the text of the first cell in the pattern
    let pos2 = boxes[pattern[1]].innerText; // Gets the text of the second cell in the pattern
    let pos3 = boxes[pattern[2]].innerText; // Gets the text of the third cell in the pattern

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      // Checks if all three cells in the pattern are not empty
      if (pos1 === pos2 && pos2 === pos3) {
        // Checks if all three cells in the pattern have the same text
        newGame.innerHTML = origunalContent; // Resets the text of the "newGame" button
        console.log("Winner", pos1); // Logs the winner to the console
        disableBoxes(); // Disables all game cells
        winner(pos1); // Displays the winner message
      }
    }
  }
}

// Function to display the winner message
function winner(turnO) {
  let newElement = document.createElement("h3"); // Creates a new h3 element
  let createText = document.createTextNode(`${turnO} is Win!`); // Creates a text node with the winner's message
  newElement.appendChild(createText); // Appends the text node to the new h3 element
  newElement.style.color = "#FE5F55"; // Sets the color of the winner message
  newElement.classList.add("win"); // Adds the "win" class to the new element
  msgCon.append(newElement); // Appends the winner message to the message container
}

// Function to display the player's turn message
function playerturn(turnO) {
  let newElement = document.createElement("h3"); // Creates a new h3 element
  let createText = document.createTextNode(`${turnO} is Win!`); // Creates a text node with the player's turn message
  newElement.appendChild(createText); // Appends the text node to the new h3 element
  newElement.style.color = "#FE5F55"; // Sets the color of the player's turn message
  newElement.classList.add("win"); // Adds the "win" class to the new element
  msgCon.append(newElement); // Appends the player's turn message to the message container
}

// Function to disable all game cells
function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true; // Disables each game cell
  });
}

// Function to reset the game
let resetGame = () => {
  turnO = true; // Resets the turn to player O
  enableBoxes(); // Enables all game cells
  removeWinMessage(); // Removes the winner message
}

// Function to enable all game cells
function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false; // Enables each game cell
    box.innerHTML = ""; // Clears the text of each game cell
  });
}

// Function to remove the winner message
function removeWinMessage() {
  let win = document.querySelector('.win'); // Selects the element with the class "win"
  if (win) {
    win.remove(); // Removes the winner message if it exists
  }
}

// Adds a click event listener to the reset button
newGame.addEventListener("click", resetGame); // Calls the resetGame function when the reset button is clicked
