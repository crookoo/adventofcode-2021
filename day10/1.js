import { parse } from './input/inputParser.js';

const input = parse('input');

let highscoreTable = new Map();
highscoreTable.set(')', 3);
highscoreTable.set(']', 57);
highscoreTable.set('}', 1197);
highscoreTable.set('>', 25137);

const openingBrackets = ['(', '[', '{', '<'];
const closingBrackets = [')', ']', '}', '>'];

let syntaxErrorScore = 0;
let scoreCollection = [];

input.forEach(line => {
    let stack = [];
    for (let j = 0; j < line.length; j++) {
        const bracket = line[j];

        if (openingBrackets.includes(bracket)) {
            stack.push(openingBrackets.indexOf(bracket));
        } else {
            if (closingBrackets.indexOf(bracket) !== stack[stack.length - 1]) {
                syntaxErrorScore += highscoreTable.get(bracket);
                break;
            } else {
                stack.pop();
            }
        }

        // after last bracket: use remaining stack to calculate completion score
        if (j === line.length - 1) {
            scoreCollection.push(calculatePoints(stack));
        }
    }
})

console.log(syntaxErrorScore);
// 374061 correct

scoreCollection.sort((a,b) => a - b);
console.log(scoreCollection[(scoreCollection.length - 1) / 2]);
// 2116639949 correct


function calculatePoints(remainingStack) {
    remainingStack.reverse();
    remainingStack = remainingStack.map(index => index + 1);
    remainingStack.unshift(0);
    return remainingStack.reduce((a, b) => a * 5 + b);
}
