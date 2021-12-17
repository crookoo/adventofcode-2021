import { parse } from './input/inputParser.js';
import Grid from './Grid.js';

const input = parse('input');

const grid1 = new Grid(input, 1);
console.log(grid1.findShortestPath());
// 613 correct

const grid2 = new Grid(input, 5);
console.log(grid2.findShortestPath());
// 2899 correct