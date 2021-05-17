class Player {
    constructor(name, type= 'computer', symbol = 'O') {
        this.name = name;
        this.playerType = type;
        this.symbol = symbol;
    }

    move = () => {
        return this.symbol;
    }
}

class Tictoctoe {
    constructor(mode = 'normal') {
        this.data = [null, null, null,null, null, null, null, null, null];
        this.mode = mode;
        this.winner = '';
        this.palyer1 = new Player('player1', 'normal', 'X');
        this.player2 = new Player('player2', 'normal', 'O');
        this.currentPlayer = this.palyer1;
    }

    reset = () => {
        this.data = [null, null, null,null, null, null, null, null, null];
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
        console.log(this.data)
        if(winningComb[`${sym}${sym}${sym}`]) {
            this.winner = name;
        } 
    }

    currentPlayerMove = (ind) => {
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
    gameBox.addEventListener("click", function onMove(e) {
        const name = e.target.getAttribute('name');
        const val = game.currentPlayerMove(name);
        document.getElementsByClassName(`item-${name}`)[0].innerHTML =  val;
       game.calculateWinner(val, game.currentPlayer.name);
       if(game.winner) {
           document.getElementById('winner').innerHTML = `Hurray!!! ${game.winner} wins`;
           gameBox.style.color = "red";
           gameBox.removeEventListener("click", onMove);
           return;
       }
        game.switchPlayer();
    });
}
start();