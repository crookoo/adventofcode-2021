import { parse } from './input/inputParser.js';

const input = parse('input');

// build graph structure
const graphMap = new Map();
input.forEach(tuple => {
    tuple.forEach((element, index, array) => {
        if (graphMap.has(element)) {
            graphMap.get(element).add(array[(index + 1) % 2]);
        } else {
            graphMap.set(element, new Set().add(array[(index + 1) % 2]));
        }
    })
})

console.log(calculatePaths(false)); // star 1
// 4011 correct

console.log(calculatePaths(true)); // star 2
// 108035 correct


function calculatePaths(allowDoubleVisit) {
    let paths = [['start']];
    let newVertexFound = true;

    while (newVertexFound) {
        newVertexFound = false;

        for (let i = 0; i < paths.length; i++) {
            let currentPath = paths.shift();
            let lastVertex = currentPath[currentPath.length - 1];

            if (lastVertex === 'end') {
                paths.push(currentPath);
            } else {
                let neighbors = graphMap.get(lastVertex);

                neighbors.forEach(neighbor => {
                    if (isUppercase(neighbor)) {
                        let newPath = currentPath.slice();
                        newPath.push(neighbor);
                        paths.push(newPath);
                        newVertexFound = true;
                    } else {
                        if (!currentPath.includes(neighbor)) {
                            let newPath = currentPath.slice();
                            newPath.push(neighbor);
                            paths.push(newPath);
                            newVertexFound = true;
                        } else if (allowDoubleVisit && noDoubleLower(currentPath) && neighbor !== 'start') {
                            let newPath = currentPath.slice();
                            newPath.push(neighbor);
                            paths.push(newPath);
                            newVertexFound = true;
                        }
                    }
                });
            }
        }
    }

    return paths.length;
}

function isUppercase(input) {
    if (input[0] === input[0].toUpperCase()) return true;
    return false;
}

function noDoubleLower(array) {
    let workingArray = array.slice();
    
    // remove upper case letters
    for (let i = 0; i < workingArray.length; i++) {
        if (workingArray[i][0] === workingArray[i][0].toUpperCase()) {
            workingArray.splice(i, 1);
        }
    }
    return (new Set(workingArray)).size === workingArray.length;
}