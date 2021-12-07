const parser = require('./input/inputParser');
const input = parser.parse('input');


// STAR 1

let reportLength = input.length;
let bitLength = input[0].length;
let counter = new Array(bitLength).fill(0);
let gammaRate = '';
let epsilonRate = '';

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === '1') counter[j]++;
    }
}

for (let i = 0; i < counter.length; i++) {
    if (counter[i] > reportLength / 2) {
        gammaRate += '1';
        epsilonRate += '0';
    } else {
        gammaRate += '0';
        epsilonRate += '1';
    }
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.log(gammaRate * epsilonRate);
// 2035764 correct


// STAR 2

let lifeSupportRating = 0;
let oxygenGeneratorRating = calculateRating(input, true);
let co2ScrubberRating = calculateRating(input, false);

lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
console.log(lifeSupportRating);
// 2817661 correct

function calculateRating(input, isOxygen) {
    let inputCopy = JSON.parse(JSON.stringify(input));
    let currentAmount = inputCopy.length;
    let currentZeroCounter = 0;
    let currentKeep = '';

    for (let i = 0; i < bitLength; i++) {
        currentAmount = inputCopy.length;
        currentZeroCounter = 0;

        for (let j = 0; j < inputCopy.length; j++) {
            if (inputCopy[j][i] === '0') currentZeroCounter++;
        }

        if (isOxygen) {
            currentKeep = (currentZeroCounter > currentAmount / 2) ? '0' : '1';
        } else {
            currentKeep = (currentZeroCounter <= currentAmount / 2) ? '0' : '1';
        }

        // traverse array from end to start and remove not fitting numbers
        for (let k = inputCopy.length - 1; k >= 0; k--) {
            if (inputCopy[k][i] !== currentKeep) inputCopy.splice(k, 1);
        }

        if (inputCopy.length === 1) return parseInt(inputCopy[0], 2);
    }
}
