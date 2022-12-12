import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = ``;

run({
    part1: {
        tests: [{ input: testInput, expected: 0 }],
        solution: part1,
    },
    // part2: {
    //     tests: [{ input: testInput, expected: 0 }],
    //     solution: part2,
    // },
    trimTestInputs: true,
    onlyTests: true,
});
