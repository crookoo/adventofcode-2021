import { parse } from './input/inputParser.js'

const input = parse('input');

// Sort input first
input.forEach(entry => {
    entry[0].sort((a, b) => a.length - b.length);
    entry.forEach(section => {
        section.forEach(element => {
            element.sort();
        })
    })
})


// STAR 1

let counter = 0;

input.forEach(entry => {
    entry[1].forEach(output => {
        if (output.length < 5 || output.length === 7) counter++;
    })
})

console.log(counter);
// 409 correct


// STAR 2

let sum = 0;

input.forEach(entry => {
    let signals = entry[0];
    let output = entry[1];

    let topRightSegment = findDifference(signals[0], signals.slice(6, 9));
    let bottomRightSegment = findDifference(signals[0], [topRightSegment]);

    let digitFive = filterDigit(topRightSegment, signals.slice(3, 6));
    let digitTwo = filterDigit(bottomRightSegment, signals.slice(3, 6));
    let digitThree = getRemaining(digitTwo, digitFive, signals.slice(3, 6));

    let digitSix = filterDigit(topRightSegment, signals.slice(6, 9));
    let digitNine = combineDigits(digitThree,digitFive);
    let digitZero = getRemaining(digitSix, digitNine, signals.slice(6, 9));

    let lookupTable = new Map();
    lookupTable.set(entry[0][0].join(''), '1');
    lookupTable.set(entry[0][1].join(''), '7');
    lookupTable.set(entry[0][2].join(''), '4');
    lookupTable.set(entry[0][9].join(''), '8');
    lookupTable.set(digitFive, '5');
    lookupTable.set(digitTwo, '2');
    lookupTable.set(digitThree, '3');
    lookupTable.set(digitSix, '6');
    lookupTable.set(digitNine, '9');
    lookupTable.set(digitZero, '0');

    let outputString = '';
    output.forEach(entry => {
        outputString += lookupTable.get(entry.join(''));
    })

    sum += parseInt(outputString);
})

console.log(sum);
// 1024649 correct


/* Helper functions */

function findDifference(firstParameter, candidates) {
    let difference = '';
    candidates.forEach(candidate => {
        difference += firstParameter.filter(x => !candidate.includes(x));
    })
    return difference;
}

function filterDigit(template, candidates) {
    let digit = [];
    candidates.forEach(candidate => {
        if (!candidate.includes(template)) digit = candidate;
    })
    return digit.join('');
}

function getRemaining(first, second, candidates) {
    let remaining = '';
    candidates.forEach(candidate => {
        candidate = candidate.join('');
        if (candidate !== first && candidate !== second) remaining = candidate;
    })
    return remaining;
}

function combineDigits(first, second) {
    let temp = new Set([...(first + second)]);
    return Array.from(temp).sort().join('');
}