import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

run({
    part1: {
        tests: [{ input: testInput, expected: 13 }],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 140 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
