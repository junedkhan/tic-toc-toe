class Player {
    constructor(name, type= 'computer', symbol = 'O') {
        this.name = name;
        this.playerType = type;
        this.symbol = symbol;
    }

    move = () => this.symbol;
}

class Tictoctoe {
    constructor(mode = 'normal') {
        this.data = [null, null, null,null, null, null, null, null, null];
        this.mode = mode;
        this.winner = '';
        this.palyer1 = new Player('X', 'normal', 'X');
        this.player2 = new Player('O', 'normal', 'O');
        this.currentPlayer = this.palyer1;
        this.gameMessage = '';
    }

    reset = () => {
        this.data = new Array(9).fill(null);
    }

    calculateWinner = (sym, name) => {
        const winningComb = {
            [`${this.data[0]}${this.data[1]}${this.data[2]}`]: true,
            [`${this.data[0]}${this.data[3]}${this.data[6]}`]: true,
            [`${this.data[0]}${this.data[4]}${this.data[8]}`]: true,
            [`${this.data[3]}${this.data[4]}${this.data[5]}`]: true,
            [`${this.data[6]}${this.data[7]}${this.data[8]}`]: true,
            [`${this.data[1]}${this.data[4]}${this.data[7]}`]: true,
            [`${this.data[2]}${this.data[5]}${this.data[8]}`]: true,
            [`${this.data[2]}${this.data[4]}${this.data[6]}`]: true,
        }
        
        if(winningComb[`${sym}${sym}${sym}`]) {
            this.winner = name;
            this.gameMessage = `Hurray! ${name} has won the match.`
        }

        if(this.data.every(item => item !== null)) {
            this.gameMessage = 'Game is draw.';
        }
    }

    currentPlayerMove = (ind) => {
        if(this.data[ind]) return this.data[ind];
        this.data[ind] = this.currentPlayer.move();
        return this.data[ind];
    }

    switchPlayer = () => {
        this.currentPlayer = this.currentPlayer === this.palyer1 ? this.player2 : this.palyer1;
    }
}

function start() {
    const game = new Tictoctoe();
    const gameBox = document.getElementById('game');
    function onMove(e) {
        const name = e.target.getAttribute('name');
        const val = game.currentPlayerMove(name);
        document.getElementsByClassName(`item-${name}`)[0].innerHTML =  val;
       game.calculateWinner(val, game.currentPlayer.name);
       if(game.gameMessage) {
           document.getElementById('message').innerHTML = game.gameMessage;
           gameBox.style.color = "red";
           gameBox.removeEventListener("click", onMove);
           return;
       }
       game.switchPlayer();
    }
    gameBox.addEventListener("click", onMove);
}
start();