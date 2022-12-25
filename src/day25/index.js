import run from 'aocrunner';
import { part1 } from './solution.js';

const testInput = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

run({
    part1: {
        tests: [{ input: testInput, expected: '2=-1=0' }],
        solution: part1,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
