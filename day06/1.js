import { parse } from './input/inputParser.js'

const input = parse('input');

// STAR 1

const cycles = 80;
let addNew = 0;
let fishList = input.slice()

for (let i = 0; i < cycles; i++) {
    addNew = 0;
    fishList.forEach((fish, index) => {
        switch (fish) {
            case 0:
                fishList[index] = 6;
                addNew++;
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                fishList[index]--;
                break;
        }
    })
    for (let j = 0; j < addNew; j++) {
        fishList.push(8);
    }
}

console.log(fishList.length);
// 359344 correct


// STAR 2: Working with sums of fishes

const cycles2 = 256;
let workingArray = new Array(9).fill(0);
let tempArray = new Array(9).fill(0);
let sumFishes = 0;

input.forEach(fish => {
    workingArray[fish]++;
})

for (let i = 0; i < cycles2; i++) {
    for (let j = 0; j < workingArray.length - 1; j++) {
        tempArray[j] = workingArray[j + 1];
    }

    tempArray[8] = workingArray[0];     // add newborn fishes
    tempArray[6] += workingArray[0];    // reset timer to 6 after birth

    for (let k = 0; k < workingArray.length; k++) {
        workingArray[k] = tempArray[k];
    }
}

workingArray.forEach(fishAmount => sumFishes += fishAmount);

console.log(sumFishes);
// 1629570219571 correct