import run from 'aocrunner';
import { part1, part2 } from './solution.js';

run({
    part1: {
        tests: [
            {
                input: `
              30373
25512
65332
33549
35390`,
                expected: 21,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
              30373
25512
65332
33549
35390`,
                expected: 8,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
