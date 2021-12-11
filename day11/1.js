import { parse } from './input/inputParser.js';

const input = parse('input');

const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const fieldLength = 10;
const steps = 100;
let flashCounter = 0;
let syncronized = false;
let stepCounter = 0;

while (!syncronized) {
    stepCounter++;

    let hasFlashed = true;
    let flashMarker = new Array(fieldLength).fill(false).map(line => new Array(fieldLength).fill(false));

    // increase octopuses by 1
    for (let i = 0; i < fieldLength; i++) {
        for (let j = 0; j < fieldLength; j++) {
            input[i][j]++;
        }
    }

    // handle flashing
    while (hasFlashed) {
        hasFlashed = false;
        for (let i = 0; i < fieldLength; i++) {
            for (let j = 0; j < fieldLength; j++) {
                if (input[i][j] > 9 && flashMarker[i][j] === false) {
                    hasFlashed = true;
                    flashCounter++;
                    flashMarker[i][j] = true;

                    neighbors.forEach(neighbor => {
                        let neighborRow = i + neighbor[0];
                        let neighborCol = j + neighbor[1];

                        if (0 <= neighborRow && neighborRow < fieldLength &&
                            0 <= neighborCol && neighborCol < fieldLength
                        ) {
                            input[neighborRow][neighborCol]++;
                        }
                    })
                }
            }
        }
    }

    // reset octopuses after flashing
    for (let i = 0; i < fieldLength; i++) {
        for (let j = 0; j < fieldLength; j++) {
            if (flashMarker[i][j]) input[i][j] = 0;
        }
    }

    // print out flash counter after x steps
    if (stepCounter === steps) {
        console.log(flashCounter); // 1656 correct
    }

    // check for flash synchronization
    syncronized = checkSyncronized(flashMarker);
    if (syncronized) console.log(stepCounter); // 303 correct

}


function checkSyncronized(input2DArray) {
    let syncronized = true;
    input2DArray.forEach(line => {
        line.forEach(marker => {
            if (marker === false) syncronized = false;
        })
    });
    return syncronized;
}