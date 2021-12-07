const parser = require('./input/inputParser');
const input = parser.parse('input');
let count = 0;
let count2 = 0;

// console.log(input);

for (let i = 0; i < input.length; i++) {
    if (input[i + 1] > input[i]) count++;
}

console.log(count);
// 1583 correct

for (let i = 0; i < input.length - 3; i++) {
    let window1 = input[i] + input[i + 1] + input[i + 2];
    let window2 = input[i + 1] + input[i + 2] + input[i + 3];
    if (window2 > window1) count2++;
}

console.log(count2);
// 1627 correct