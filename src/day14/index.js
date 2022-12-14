import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

run({
    part1: {
        tests: [{ input: testInput, expected: 24 }],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 93 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
