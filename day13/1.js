import { parse } from './input/inputParser.js';

const input = parse('input');

const dots = input[0].slice().split('\n').map(coords => coords.split(',').map(rawNumber => parseInt(rawNumber)));
const instructions = input[1].slice().split('\n').map(line => line.slice(11).split('=')).map(element => [element[0], parseInt(element[1])]);
const [xMax, yMax] = findMaxValues(instructions);

// initialize transparent paper
let paper = new Array(yMax).fill(' ').map(() => new Array(xMax).fill(' '));
for (let i = 0; i < dots.length; i++) {
    paper[dots[i][1]][dots[i][0]] = '#';
}

// fold paper
instructions.forEach((instruction, index) => {
    let currentDirection = instruction[0];
    let newPaper = null;

    if (currentDirection === 'x') {
        let height = paper.length;
        let width = (paper[0].length - 1) / 2;
        newPaper = new Array(height).fill(' ').map(() => new Array(width).fill(' '));
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (paper[i][j] === '#' || paper[i][paper[i].length - 1 - j] === '#') {
                    newPaper[i][j] = '#';
                }
            }
        }
    } else {
        let height = (paper.length - 1) / 2;
        let width = paper[0].length;
        newPaper = new Array(height).fill(' ').map(() => new Array(width).fill(' '));
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (paper[i][j] === '#' || paper[paper.length - 1 - i][j] === '#') {
                    newPaper[i][j] = '#';
                }
            }
        }
    }

    paper = newPaper;

    if (index === 0) console.log(countChars('#', paper)); // 731 correct
})

console.log(array2dToString(paper));
// ZKAUCFUC correct


function array2dToString(input2dArray) {
    let output = '';
    input2dArray.forEach(line => {
        output += line.join('') + '\n';
    })
    return output;
}

function countChars(char, input2dArray) {
    let counter = 0;
    input2dArray.forEach(line => {
        line.forEach(element => {
            if (element === char) counter++;
        })
    })
    return counter;
}

function findMaxValues(instructions) {
    let firstX = instructions.find(instruction => instruction[0] === 'x');
    let firstY = instructions.find(instruction => instruction[0] === 'y');
    let valueX = firstX[1];
    let valueY = firstY[1];
    return [(valueX * 2 + 1), (valueY * 2 + 1)];
}