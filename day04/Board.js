export default class Board {

    constructor(rawBoardString) {
        this.boardArray = rawBoardString
            .split(/\n\s*/g)
            .map(line => line.split(/\s+/g).map(numberString => parseInt(numberString)));
    }

    markNumber(randomNumber) {
        this.boardArray.forEach((line, i) => {
            line.forEach((number, j) => {
                if (number === randomNumber) {
                    this.boardArray[i][j] = null;
                }
            })
        })
    }

    checkWinning() {
        let counter = 0;
        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[i].length; j++) {
                if (this.boardArray[i][j] === null) counter++;
            }
            if (counter === 5) return true;
            counter = 0;
        }
        for (let i = 0; i < this.boardArray[0].length; i++) {
            for (let j = 0; j < this.boardArray.length; j++) {
                if (this.boardArray[j][i] === null) counter++;
            }
            if (counter === 5) return true;
            counter = 0;
        }
        return false;
    }

    getRemainingSum() {
        let sum = 0;
        this.boardArray.forEach((line) => {
            line.forEach((number) => {
                sum += number;
            })
        })
        return sum;
    }
}