import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `
1
2
-3
3
-2
0
4`;

run({
    part1: {
        tests: [{ input: testInput, expected: 3 }],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 1623178306 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
