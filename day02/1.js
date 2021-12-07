const parser = require('./input/inputParser');
const input = parser.parse('input');

// console.log(input);

let horizontal = 0;
let depth = 0;

for (let i = 0; i < input.length; i++) {
    let direction = input[i][0];
    let directionValue = input[i][1];

    switch (direction) {
        case 'forward':
            horizontal += directionValue;
            break;
        case 'up':
            depth -= directionValue;
            break;
        case 'down':
            depth += directionValue;
            break;
    }
}

console.log(horizontal, depth);
console.log(horizontal * depth);
// 2039256 correct

let aim = 0;
let horizontal2 = 0;
let depth2 = 0;

for (let i = 0; i < input.length; i++) {
    let direction = input[i][0];
    let directionValue = input[i][1];

    switch (direction) {
        case 'forward':
            horizontal2 += directionValue;
            depth2 += (aim * directionValue);
            break;
        case 'up':
            aim -= directionValue;
            break;
        case 'down':
            aim += directionValue;
            break;
    }
}

console.log(horizontal2, depth2);
console.log(horizontal2 * depth2);
// 1856459736 correct