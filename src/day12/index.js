import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

run({
    part1: {
        tests: [{ input: testInput, expected: 31 }],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 29 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
