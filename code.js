//at first we need to access the things to make changes in them 
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {//we could also write if(turn0===true)
            //playerO
            box.innerText = "O";
            turnO = false;//then set it to false for the next tym
        } else {
            //playerX
            box.innerText = "X";
            turnO = true;
        }//after writing this code all is good but there is a loop tht if we click on a btn for the second tym then it will display other value ex- if we click on the btn and it displayed 0 then firse click karenge toh it will display X.
        //Bt tic tac toe mein toh we cant change the value once its stored so as we written the innertext we hav to disable the btn 
        //so we cant change once we played
        //now to check the winner , we hav to check each tym whether we getting a winning pattern or not just after the clicking of the btn,checkWinner(); will do tht
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//to stop the game after we found one winner , we r making this function
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

//it will enable all the boxes when a new game will be started
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;//Boxes ke andr ki value
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
