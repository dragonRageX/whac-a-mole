let grid = document.querySelector(".grid");
let mole = document.querySelector(".mole");
let resultDisplay = document.querySelector(".result-display");
let timeDisplay = document.querySelector(".time-display");
let playButton = document.querySelector("button");

for(let i = 0; i < 9; i++)
{
    let tile = document.createElement("div");
    tile.setAttribute("class", "square");
    tile.setAttribute("data-id", i);
    // tile.addEventListener("click", makeMole);
    grid.appendChild(tile);
}
console.log(grid);

let squares = document.querySelectorAll(".square");
console.log(squares);
let randomSquareTile;
function randomTile()
{
    squares.forEach(square => {
        square.classList.remove("square-mole");
    })
    randomSquareTile = squares[Math.floor(Math.random() * 9)];
    randomSquareTile.classList.add("square-mole");   //THE classList.add() HELPS TO ADD ADDITIONAL CLASSES TO THE SAME ELEMENT IRRESPECTIVE OF OTHER PRE-EXISTING CLASSES (YES, AN ELEMENT CAN HAVE MULTIPLE CLASSES AT THE SAME TIME).
    console.log(randomSquareTile);
}

// function makeMole()
// {
//     this.classList.add("square-mole");   //THIS COMMENTED CODE IS FOR MAKING A TILE BLUE JUST BY SIMPLY CLICKING IT.
// }

let score = 0;
let moveMole;
let selectedTileArray = [];
function moveMoleAndIncrementScore()
{
    moveMole = setInterval(randomTile, 1000);
    squares.forEach(square => {   //THIS CODE MAKES ALL THE SQUARE TILES LISTEN OUT FOR A click SO THAT IT INVOKES THE FUNCTION FOLLOWING IT.
        square.addEventListener("mousedown", () => {
            selectedTileArray.push(square.getAttribute("data-id"));   //WE MAKE USE OF AN ARRAY HERE INORDER TO STORE THE DATA-ID OF THE TILE SELECTED BY THE USER SO THAT WE CAN ALLOW THE USER TO CLICK A TILE JUST ONCE. FOR THIS, WE COMPARE THE LAST TWO ELEMENTS OF THE ARRAY.
            console.log(selectedTileArray);
            if(selectedTileArray[selectedTileArray.length - 1] != selectedTileArray[selectedTileArray.length - 2])
            {
                if(square.getAttribute("data-id") == randomSquareTile.getAttribute("data-id"))   //THIS CHECKS FOR THE data-id VALUE OF THE USER SELECTED TILE WITH THE data-id VALUE ASSIGNED TO THE MOLE-TILE.
                {
                    score = score + 1;
                }
                resultDisplay.innerHTML = score;
            }
            // selectedTileArray = [];
        })
    })
}

let currentTime = 10;
let startTime = currentTime;
function timer()
{
    timeDisplay.innerHTML = currentTime;
    if(currentTime == 0)
    {
        clearInterval(stopWatch);
        clearInterval(moveMole);
        alert("Game Over! Your score is " + score);
        selectedTileArray = [];
        currentTime = startTime;
        score = 0;
        resultDisplay.innerHTML = 0;
        squares.forEach(square => {
            square.classList.remove("square-mole");
        })
    }
    currentTime--;
}

let stopWatch;
playButton.addEventListener("click", () => {   //HERE WE INVOKE MULTIPLE FUNCTIONS INSIDE THE SAME addEventListener().
    moveMoleAndIncrementScore();
    stopWatch = setInterval(timer, 1000);
});
