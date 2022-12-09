import run from 'aocrunner';
import { part1, part2 } from './solution.js';

run({
    part1: {
        tests: [
            {
                input: `
                  R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2`,
                expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                  R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
                expected: 36,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
