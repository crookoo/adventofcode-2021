import { parse } from './input/inputParser.js';
import Node from './Node.js';

const input = parse('input');
const neighbors = [[-1, 0], [0, -1], [0, 1], [1, 0]];

console.time('star 1');
// init working table star 1
let grid = new Array(input.length).fill(null).map(line => new Array(input.length).fill(null));
input.forEach((line, i) => {
    line.forEach((nodeWeight, j) => {
        grid[i][j] = new Node(nodeWeight);
    })
})
grid[0][0].cost = 0;
grid[0][0].predecessor = encode(0, 0);

console.log(findShortestPath(grid)); // 613 correct
console.timeEnd('star 1');


console.time('star 2');
// init working table star 2
const multiplier = 1; // has to be 5 - runtime problem
let gridComplete = new Array(input.length * multiplier).fill(null).map(line => new Array(input.length * multiplier).fill(null));
for (let k = 0; k < multiplier; k++) {
    for (let m = 0; m < multiplier; m++) {
        input.forEach((line, i) => {
            line.forEach((nodeWeight, j) => {
                let newWeight = (nodeWeight + k + m) > 9 ? (nodeWeight + k + m + 1) % 10 : (nodeWeight + k + m) % 10;
                gridComplete[i + (k * input.length)][j + (m * input.length)] = new Node(newWeight);
            })
        })
    }
}
gridComplete[0][0].cost = 0;
gridComplete[0][0].predecessor = encode(0, 0);

console.log(findShortestPath(gridComplete)); // not working yet - runtime problem
console.timeEnd('star 2');


function findShortestPath(grid) { // Dijkstra algorithm
    let visited = new Set();

    while (visited.size < grid.length ** 2) {
        let [i, j] = getNodeWithLowestCost(grid, visited);

        neighbors.forEach(neighbor => {
            let neighborRow = i + neighbor[0];
            let neighborCol = j + neighbor[1];
            let encodedNeighbor = encode(neighborRow, neighborCol);

            if (0 <= neighborRow && neighborRow < grid.length &&
                0 <= neighborCol && neighborCol < grid[0].length &&
                !visited.has(encodedNeighbor)) {
                let neighborCost = grid[neighborRow][neighborCol].cost;
                let weight = grid[neighborRow][neighborCol].weight;
                if ((grid[i][j].cost + weight) < neighborCost) {
                    grid[neighborRow][neighborCol].cost = grid[i][j].cost + weight;
                    grid[neighborRow][neighborCol].predecessor = encode(i, j);
                }
            }
        });

        visited.add(encode(i, j));
    }

    return grid[grid.length - 1][grid.length - 1].cost;

}

function getNodeWithLowestCost(input2dArray, visited) {
    let lowestCost = Infinity;
    let nodeI = null, nodeJ = null;
    for (let i = 0; i < input2dArray.length; i++) {
        for (let j = 0; j < input2dArray[i].length; j++) {
            if (input2dArray[i][j].cost < lowestCost && !visited.has(encode(i, j))) {
                lowestCost = input2dArray[i][j].cost;
                nodeI = i;
                nodeJ = j;
            }
        }
    }
    return [nodeI, nodeJ];
}

function encode(i, j) {
    return `${i},${j}`;
}
