import { parse } from './input/inputParser.js'

const input = parse('input');


console.log(getOptimalFuel(input, false));
// 352254 correct

console.log(getOptimalFuel(input, true)); // use sum formula ("Kleiner Gauss") in line 25 of function
// 99053143 correct


function getOptimalFuel(input, task2) {
    const lowestPos = Math.min(...input);
    const highestPos = Math.max(...input);

    let optimalPos = null;
    let optimalFuel = Infinity;
    let currentFuelCost = 0;
    let currentDelta = 0;

    for (let currentPos = lowestPos; currentPos <= highestPos; currentPos++) {
        input.forEach(crapPos => {
            currentDelta = Math.abs(crapPos - currentPos);
            if (task2) currentDelta = currentDelta * (currentDelta + 1) / 2;
            currentFuelCost += currentDelta;
        })
        if (currentFuelCost < optimalFuel) {
            optimalFuel = currentFuelCost;
            optimalPos = currentPos;
        }
        currentFuelCost = 0;
    }

    return optimalFuel;
}