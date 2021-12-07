import { parse } from './input/inputParser.js'

const input = parse('input');

let maxCoord = findHighestValue(input) + 1;
let workingMatrix = new Array(maxCoord).fill(0).map(line => new Array(maxCoord).fill(0));

// STAR 1

input.forEach(entry => {
    let x1 = entry[0][0], x2 = entry[1][0], y1 = entry[0][1], y2 = entry[1][1];
    if (x1 === x2) {
        let fixedDirection = x1;
        let steps = Math.abs(y1 - y2) + 1;
        let smallerValue = y1 < y2 ? y1 : y2;
        for (let y = smallerValue; y < smallerValue + steps; y++) {
            workingMatrix[y][fixedDirection]++;
        }
    }
    if (y1 === y2) {
        let fixedDirection = y1;
        let steps = Math.abs(x1 - x2) + 1;
        let smallerValue = x1 < x2 ? x1 : x2;
        for (let x = smallerValue; x < smallerValue + steps; x++) {
            workingMatrix[fixedDirection][x]++;
        }
    }
})

console.log(collectOverlappingPoints(workingMatrix));
// 7085 correct


// STAR 2

input.forEach(entry => {
    let x1 = entry[0][0], x2 = entry[1][0], y1 = entry[0][1], y2 = entry[1][1];
    if (x1 !== x2 && y1 !== y2) {
        let steps = Math.abs(x1 - x2) + 1;
        let startingX = x1 < x2 ? x1 : x2;
        let startingY = (startingX === x1) ? y1 : y2;
        let direction = (x2 < x1 && y1 < y2) || (x1 < x2 && y2 < y1) ? -1 : 1;
        for (let x = startingX; x < startingX + steps; x++) {
            workingMatrix[startingY][x]++;
            startingY += direction;
        }
    }
})

console.log(collectOverlappingPoints(workingMatrix));
// 20271 correct


// Helper functions

function findHighestValue(input) {
    let highestValue = 0;
    input.forEach(entry => {
        entry.forEach(point => {
            point.forEach(coord => {
                if (coord > highestValue) highestValue = coord;
            })
        })
    })
    return highestValue;
}

function collectOverlappingPoints(input2DArray) {
    let counter = 0;
    input2DArray.forEach(line => {
        line.forEach(point => {
            if (point > 1) counter++;
        })
    })
    return counter;
}