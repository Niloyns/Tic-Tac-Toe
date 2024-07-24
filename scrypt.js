let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector("#new-btn");
let msgCon = document.querySelector(".masseg-container");
let origunalContent = newGame.innerText;

let turnO = true;


//all winning possible
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 6],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//click button
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    newGame.innerText = "Reset";
    if (turnO) {
      //player O
      msgCon.innerHTML="X turn"
      msgCon.style.color= "red"
      box.innerText = "O";
      box.style.color = "red";
      turnO = false; // turnO is referring to the global variable
    } else {
      //player X
      msgCon.innerHTML="O turn"
      msgCon.style.color= "green"
      box.innerText = "X";
      box.style.color = "green";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

//check winner
function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        newGame.innerHTML = origunalContent;
        console.log("Winner", pos1);
        disableBoxes();
        winner(pos1);
      }
    }
  }
}

//winner name display
function winner(turnO) {
  let newElement = document.createElement("h3");
  let createText = document.createTextNode(`${turnO} is Win!`);
  newElement.appendChild(createText);
  newElement.style.color = "#FE5F55";
  newElement.classList.add("win");
  msgCon.append(newElement);
}

function playerturn(turnO) {
  let newElement = document.createElement("h3");
  let createText = document.createTextNode(`${turnO} is Win!`);
  newElement.appendChild(createText);
  newElement.style.color = "#FE5F55";
  newElement.classList.add("win");
  msgCon.append(newElement);
}

//all box disable
function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

//reset btn
let resetGame = ()=>{
  turnO = true;
  enableBoxes();
  removeWinMessage();
}

//all box enable
function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML="";
  });
}

//win massage remove
function removeWinMessage() {
  let win = document.querySelector('.win');
  if (win) {
    win.remove();
  }
}

//new game/reset btn 
newGame.addEventListener("click" ,resetGame);
