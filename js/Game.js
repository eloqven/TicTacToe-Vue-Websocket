class Game {
    constructor() {
        this.inProgress = true;
        this.winner = null; // o or x
        this.lastIndex = null;
        this.currentTurn = Game.O; // o or x
        this.movesMade = 0; // changes when squares are clicked
        this.squares = new Array(9).fill().map(s => new Square());
    }

    makeMove(i) {
        // update square if game started and square is available
        if (this.inProgress && !this.squares[i].value) {
            this.squares[i].value = this.currentTurn;
            this.movesMade++;
            this.lastIndex = i;
            this.checkForWinner();
            this.currentTurn = this.currentTurn === Game.O ? Game.X : Game.O;
        }
    }

    restartGame() {
        this.inProgress = true;
        this.winner = null;
        this.currentTurn = this.currentTurn === Game.O ? Game.X : Game.O;
        this.movesMade = 0; // changes when squares are clicked
        this.squares = new Array(9).fill().map(s => new Square());
    }

    checkForWinner() {
        // hardcoding possible winning scenarios
        const winningCombinations = [
            [0, 1, 2], // 1st row  [¯¯¯]
            [3, 4, 5], // 2nd row  [---]
            [6, 7, 8], // 3rd row  [___]
            [0, 3, 6], // 1st collumn  [|⋮⋮]
            [1, 4, 7], // 2nd collumn  [⋮|⋮]
            [2, 5, 8], // 3rd collumn  [⋮⋮|]
            [0, 4, 8], // descending [.\`]
            [2, 4, 6]  // ascending  [`/.]
        ];

        winningCombinations.forEach(wc => {
            const [a, b, c] = wc; // example:  |⋮⋮ => a=0; b=3; c=6;
            const sqA = this.squares[a];
            const sqB = this.squares[b];
            const sqC = this.squares[c];

            if (sqA.value && sqA.value == sqB.value && sqA.value == sqC.value) {
                this.inProgress = false;
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;
                this.winner = sqA.value;
            }
        });

        // draw
        if (this.movesMade === this.squares.length) {
            this.inProgress = false;
            console.log('it\'s a tie')
        }
    }
}

Game.O = 'O';
Game.X = 'X';