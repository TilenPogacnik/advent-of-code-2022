import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

run({
    part1: {
        tests: [{ input: testInput, expected: 152 }],
        solution: part1,
    },
    part2: {
        tests: [{ input: testInput, expected: 301 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
