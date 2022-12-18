import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

const simpleTestInput = `1,1,1
2,1,1`;

run({
    part1: {
        tests: [
            { input: simpleTestInput, expected: 10 },
            { input: testInput, expected: 64 },
        ],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 58 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
