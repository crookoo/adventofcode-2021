import { readFileSync, writeFile } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readInputFromFile = (filename) => {
    return readFileSync(resolve(__dirname, `./${filename}.txt`), "utf-8");
};

export const parse = (filename) => {
    const rawInput = readInputFromFile(filename);
    const parsedInput = rawInput
        .split(',')
        .map(rawNumber => parseInt(rawNumber));
    return parsedInput;
};

export const writeToDisk = (filename, content) => {
    writeFile(resolve(__dirname, `./data/${filename}.txt`), content, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
}