import { parse } from './input/inputParser.js'
import BingoGame from './BingoGame.js';

const input = parse('input');

const game1 = new BingoGame(input);
console.log(game1.findFirstWinningBoard());
// 23177 correct

const game2 = new BingoGame(input);
console.log(game2.findLastWinningBoard());
// 6804 correct