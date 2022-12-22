import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

run({
    part1: {
        tests: [{ input: testInput, expected: 6032 }],
        solution: part1,
    },
    part2: {
        solution: part2,
    },
    trimTestInputs: false,
    // onlyTests: true,
});
