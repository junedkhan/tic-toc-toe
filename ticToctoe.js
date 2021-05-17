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
        console.log('player2', this.player2)
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
        console.log("this.palyer2", this.player2)
        this.currentPlayer = this.currentPlayer === this.palyer1 ? this.player2 : this.palyer1;
        console.log("this.currentPlayer", this.currentPlayer);
    }
}

function start() {
    const game = new Tictoctoe();
    console.log(game)
    document.getElementById('game').addEventListener("click", function hurra(e) {
        const name = e.target.getAttribute('name');
        
        const val = game.currentPlayerMove(name);
        document.getElementsByClassName(`item-${name}`)[0].innerHTML =  val;
       game.calculateWinner(val, game.currentPlayer.name);
       if(game.winner) {
           document.getElementById('winner').innerHTML = `Hurray!!! ${game.winner} wins`;
           document.getElementById('game').style.color = "red";
           document.getElementById('game').removeEventListener("click", hurra);
           return;
       }
        game.switchPlayer();
    });
}
start();