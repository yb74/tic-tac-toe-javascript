// modal
let modalElt = document.getElementById("modal");

// stats p1
let symboleAccPlayer1 = [];
let p1_victoryElt = document.getElementById("p1-won-games");
let p1_victory = 0;
let p1_defeatElt = document.getElementById("p1-lost-games");
let p1_defeat = 0;

// stats p2
let symboleAccPlayer2 = [];
let p2_victoryElt = document.getElementById("p2-won-games");
let p2_victory = 0;
let p2_defeatElt = document.getElementById("p2-lost-games");
let p2_defeat = 0;

let count = 0;
let gameover = false;
let reset = false;

// Stocking columns, lines and diagonals' ID in an array
let line1 = ["box-1a", "box-1b", "box-1c"];
let line2 = ["box-2a", "box-2b", "box-2c"];
let line3 = ["box-3a", "box-3b", "box-3c"];

let column1 = ["box-1a", "box-2a", "box-3a"];
let column2 = ["box-1b", "box-2b", "box-3b"];
let column3 = ["box-1c", "box-2c", "box-3c"];

let diagonale1 = ["box-1a", "box-2b", "box-3c"];
let diagonale2 = ["box-1c", "box-2b", "box-3a"];

let box1a = document.getElementById("box-1a");
let box1b = document.getElementById("box-1b");
let box1c = document.getElementById("box-1c");

let box2a = document.getElementById("box-2a");
let box2b = document.getElementById("box-2b");
let box2c = document.getElementById("box-2c");

let box3a = document.getElementById("box-3a");
let box3b = document.getElementById("box-3b");
let box3c = document.getElementById("box-3c");

// player turn text
let playerNameText = document.getElementById("player-name-turn-text");

// function reset score
const resetScore = () => {
    reset = true;
    modalElt.style.display = "none";
    document.getElementById("player-turn-text").innerHTML = 'It\'s <span id="player-name-turn-text" class="player-name-turn-text">Player 1</span> turn';
    restart();
}

// function restart
const restart = () => {
    modalElt.style.display = "none";
    console.log("Game restarted");
    document.getElementById("player-turn-text").innerHTML = 'It\'s <span id="player-name-turn-text" class="player-name-turn-text">Player 1</span> turn';
    gameover = false;
    if (count === 0) {
        symboleAccPlayer1 = [];
        symboleAccPlayer2 = [];
        for (let i=0; i<document.getElementsByClassName("boxes").length; i++) {
            // clearing the board game (removing all crosses and cirlces)
            document.getElementsByClassName("boxes")[i].classList.remove("cross", "circle");
        }
        // Hiding gameover block and showing player turn box again
        document.getElementById("player-turn-box").style.display ="flex";
        document.getElementById("player-gameover-box").style.display ="none";

        // restart with player 1 as first player to play
        playerNameText.textContent = "Player 1";
        document.getElementById("player-turn-cross").style.display = "none";
        document.getElementById("player-turn-circle").style.display = "block";

        if (reset) {
            p1_victoryElt.textContent = 0;
            p1_victory = 0;
            p1_defeatElt.textContent = 0;
            p1_defeat = 0;

            p2_victoryElt.textContent = 0;
            p2_victory = 0;
            p2_defeatElt.textContent = 0;
            p2_defeat = 0;

            reset = false;
        }
    };
}

// click handling
const clickBox = (clickedId) => {
    const elt = document.getElementById(clickedId);

    // condition below prevnent to replace a cross by a circle and vice-versa
    if (!elt.classList.contains("circle") && !elt.classList.contains("cross") && !gameover) {
        count += 1;

        if (count % 2 === 0) { // player 2 (impair)
            elt.classList.add("cross");
            playerNameText.textContent = "Player 2";
            document.getElementById("player-turn-cross").style.display = "none";
            document.getElementById("player-turn-circle").style.display = "block";

            // manage victory player 2
            symboleAccPlayer2.push(elt.id);

            console.log(symboleAccPlayer2);

            let p2_checker = (arrP2, targetP2) => targetP2.every(vP2 => arrP2.includes(vP2));
            
            if (
                p2_checker(symboleAccPlayer2, line1) ||
                p2_checker(symboleAccPlayer2, line2) ||
                p2_checker(symboleAccPlayer2, line3) ||
                p2_checker(symboleAccPlayer2, column1) ||
                p2_checker(symboleAccPlayer2, column2) ||
                p2_checker(symboleAccPlayer2, column3) ||
                p2_checker(symboleAccPlayer2, diagonale1) ||
                p2_checker(symboleAccPlayer2, diagonale2)
            ) {
                gameover = true;
                // manage score/stats
                p2_victory += 1;
                p2_victoryElt.textContent = p2_victory;

                p1_defeat += 1;
                p1_defeatElt.textContent = p1_defeat;
                // alert("player 2 won !!");
                modalElt.style.display = "block";

                document.getElementById("player-gameover-text").innerHTML = 'The winner is <span id="player-name-gameover-text" class="player-name-gameover-text">Player 2</span> !!! ';
                document.getElementById("player-modal-gameover-text").innerHTML = 'The winner is <span id="player-modal-name-gameover-text" class="player-modal-name-gameover-text">Player 2</span> !!! ';
                document.getElementById("player-turn-box").style.display = "none";
                document.getElementById("player-gameover-box").style.display = "flex";
            } else {
                console.log("player 2 hasn't won yet !!")
                if (count === 9) {
                    modalElt.style.display = "block";
                    document.getElementById("player-modal-gameover-text").innerHTML = "It's a draw !!!";
                    document.getElementById("player-turn-text").innerHTML = "It's a draw !!!";
                    document.getElementById("player-turn-circle").style.display = "none";
                    document.getElementById("player-turn-cross").style.display = "none";
                    count = 0;
                }
            }
        } else { // player 1 (impaire)
            elt.classList.add("circle");
            playerNameText.textContent = "Player 1";
            document.getElementById("player-turn-cross").style.display = "block";
            document.getElementById("player-turn-circle").style.display = "none";

            // manage victory player 1
            symboleAccPlayer1.push(elt.id);

            console.log(symboleAccPlayer1);

            let p1_checker = (arrP1, targetP1) => targetP1.every(vP1 => arrP1.includes(vP1));
            
            if (
                p1_checker(symboleAccPlayer1, line1) ||
                p1_checker(symboleAccPlayer1, line2) ||
                p1_checker(symboleAccPlayer1, line3) ||
                p1_checker(symboleAccPlayer1, column1) ||
                p1_checker(symboleAccPlayer1, column2) ||
                p1_checker(symboleAccPlayer1, column3) ||
                p1_checker(symboleAccPlayer1, diagonale1) ||
                p1_checker(symboleAccPlayer1, diagonale2)
            ) {
                gameover = true;
                // manage score
                p1_victory += 1;
                p1_victoryElt.textContent = p1_victory;

                p2_defeat += 1;
                p2_defeatElt.textContent = p2_defeat;

                modalElt.style.display = "block";

                document.getElementById("player-gameover-text").innerHTML = 'The winner is <span id="player-name-gameover-text" class="player-name-gameover-text">Player 1</span> !!! ';
                document.getElementById("player-modal-gameover-text").innerHTML = 'The winner is <span id="player-modal-name-gameover-text" class="player-modal-name-gameover-text">Player 1</span> !!! ';
                document.getElementById("player-turn-box").style.display = "none";
                document.getElementById("player-gameover-box").style.display = "flex";
                // alert("player 1 won !!");
            } else {
                console.log("player 1 hasn't won yet !!");
                if (count === 9) {
                    modalElt.style.display = "block";
                    document.getElementById("player-modal-gameover-text").innerHTML = "It's a draw !!!";
                    document.getElementById("player-turn-text").innerHTML = "It's a draw !!!";
                    document.getElementById("player-turn-circle").style.display = "none";
                    document.getElementById("player-turn-cross").style.display = "none";
                    count = 0;
                }
            }
        };

        console.log("count : %d", count);

        if (gameover) {
            document.getElementById("player-turn-box").style.display ="none";
            document.getElementById("player-gameover-box").style.display ="flex";
            count = 0;
        }
    }
}