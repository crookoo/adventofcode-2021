import Board from './Board.js';

export default class BingoGame {

    constructor(gameInputArray) {
        let inputCopy = gameInputArray.slice();

        this.randomNumbers = inputCopy
            .shift()
            .split(',')
            .map(numberString => parseInt(numberString));

        this.boardList = [];
        inputCopy.forEach((rawBoardString) => {
            this.boardList.push(new Board(rawBoardString));
        })
    }

    findFirstWinningBoard() {
        for (let i = 0; i < this.randomNumbers.length; i++) {
            for (let j = 0; j < this.boardList.length; j++) {
                this.boardList[j].markNumber(this.randomNumbers[i]);
            }
            for (let j = 0; j < this.boardList.length; j++) {
                if (this.boardList[j].checkWinning()) {
                    return this.boardList[j].getRemainingSum() * this.randomNumbers[i];
                }
            }
        }
    }

    findLastWinningBoard() {
        for (let i = 0; i < this.randomNumbers.length; i++) {
            for (let j = 0; j < this.boardList.length; j++) {
                this.boardList[j].markNumber(this.randomNumbers[i]);
            }
            for (let j = this.boardList.length - 1; j >= 0; j--) {
                if (this.boardList[j].checkWinning()) {
                    if (this.boardList.length > 1) {
                        this.boardList.splice(j, 1);
                    } else {
                        return this.boardList[j].getRemainingSum() * this.randomNumbers[i];
                    }
                }
            }
        }
    }
}