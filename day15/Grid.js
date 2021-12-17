import Node from './Node.js';

export default class Grid {

    constructor(input, multiplier) {
        this.grid = new Array(input.length * multiplier).fill(null).map(line => new Array(input.length * multiplier).fill(null));

        for (let k = 0; k < multiplier; k++) {
            for (let m = 0; m < multiplier; m++) {
                input.forEach((line, i) => {
                    line.forEach((nodeWeight, j) => {
                        let newWeight = (nodeWeight + k + m) > 9 ? (nodeWeight + k + m + 1) % 10 : (nodeWeight + k + m) % 10;
                        let nodeI = i + (k * input.length);
                        let nodeJ = j + (m * input.length);
                        this.grid[nodeI][nodeJ] = new Node(newWeight, nodeI, nodeJ);
                    })
                })
            }
        }

        this.grid[0][0].cost = 0;
        this.grid[0][0].predecessor = this.encode(0, 0);
    }

    // Dijkstra algorithm
    findShortestPath() {
        const neighbors = [[-1, 0], [0, -1], [0, 1], [1, 0]];
        let grid = this.grid;
        let visited = new Set();
        let active = new Set([this.encode(0, 0)]); // start at 0,0

        while (visited.size < grid.length ** 2) {
            let [i, j] = this.getNodeWithLowestCost(active, grid);

            neighbors.forEach(neighbor => {
                let neighborRow = i + neighbor[0];
                let neighborCol = j + neighbor[1];
                let encodedNeighbor = this.encode(neighborRow, neighborCol);

                if (0 <= neighborRow && neighborRow < grid.length &&
                    0 <= neighborCol && neighborCol < grid[0].length &&
                    !visited.has(encodedNeighbor)) {
                    let neighborCost = grid[neighborRow][neighborCol].cost;
                    let weight = grid[neighborRow][neighborCol].weight;
                    if ((grid[i][j].cost + weight) < neighborCost) {
                        grid[neighborRow][neighborCol].cost = grid[i][j].cost + weight;
                        grid[neighborRow][neighborCol].predecessor = this.encode(i, j);
                        active.add(this.encode(neighborRow, neighborCol));
                    }
                }
            });

            visited.add(this.encode(i, j));
            active.delete(this.encode(i, j));
        }

        return grid[grid.length - 1][grid.length - 1].cost; // return cost of bottom right node

    }

    getNodeWithLowestCost(activeNodes, grid) {
        let lowestCost = Infinity;
        let nodeI = null, nodeJ = null;

        activeNodes.forEach(activeNode => {
            let [i, j] = this.decode(activeNode);
            if (grid[i][j].cost < lowestCost) {
                lowestCost = grid[i][j].cost;
                nodeI = i;
                nodeJ = j;
            };
        })

        return [nodeI, nodeJ];
    }

    encode(i, j) {
        return `${i},${j}`;
    }

    decode(encodedString) {
        return encodedString.split(',').map(numberString => parseInt(numberString));
    }
}