import { parse } from './input/inputParser.js';

const input = parse('input');
const neighbors = [[-1, 0], [0, -1], [0, 1], [1, 0]]

let riskLevelSum = 0;
let basinCollection = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {

        // find low point
        let higherFound = false;
        neighbors.forEach(neighbor => {
            let neighborRow = i + neighbor[0];
            let neighborCol = j + neighbor[1];

            if (0 <= neighborRow && neighborRow < input.length &&
                0 <= neighborCol && neighborCol < input[0].length &&
                input[i][j] >= input[neighborRow][neighborCol]
            ) {
                higherFound = true;
            }
        })

        // if low point found
        if (!higherFound) {

            // sum up risk level
            riskLevelSum += (input[i][j] + 1);

            // collect basin field size
            basinCollection.push(getBasinFieldSize(i, j));
        }
    }
}

console.log(riskLevelSum);
// 465 correct

basinCollection.sort((a, b) => b - a);
let largestThree = basinCollection.slice(0, 3);

console.log(largestThree.reduce((a, b) => a * b));
// 1269555 correct


function getBasinFieldSize(i, j) {
    // breath first search
    let countBasin = 0;
    let queue = [];
    let visited = new Set();
    let current = '';
    let x = null;
    let y = null;

    queue.push(encode(i, j));

    while (queue.length) {
        current = queue.shift();
        [x, y] = decode(current);
        
        visited.add(current);
        countBasin++;

        neighbors.forEach(neighbor => {
            let neighborRow = x + neighbor[0];
            let neighborCol = y + neighbor[1];
            let encodedNeighbor = encode(neighborRow, neighborCol);

            if (0 <= neighborRow && neighborRow < input.length &&
                0 <= neighborCol && neighborCol < input[0].length &&
                input[neighborRow][neighborCol] !== 9 &&
                !visited.has(encodedNeighbor) &&
                !queue.includes(encodedNeighbor)
            ) {
                queue.push(encodedNeighbor);
            }
        });
    }
    return countBasin;
}

function encode(i, j) {
    return `${i},${j}`;
}

function decode(encodedString) {
    return encodedString.split(',').map(numberString => parseInt(numberString));
}