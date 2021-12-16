import { parse } from './input/inputParser.js';

const input = parse('input-test');

const template = input[0].split('');
const rules = new Map(input[1].split('\n').map(line => line.split(' -> ')));
const countMap = new Map();
const steps = 14; // 13 geht noch gut durch, 14 dauert

for (let i = 0; i < steps; i++) {
    for (let j = template.length - 1; j > 0; j--) {
        template.splice(j, 0, rules.get(template[j - 1] + template[j]));
    }
}

template.forEach(char => {
    if (countMap.has(char)) {
        countMap.set(char, countMap.get(char) + 1);
    } else {
        countMap.set(char, 1);
    }
})

let occurences = Array.from(countMap.values()).sort((a,b) => a - b);
console.log(occurences[occurences.length - 1] - occurences[0]);
// 2851 correct