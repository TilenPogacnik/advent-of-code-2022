import run from 'aocrunner';
import { part1, part2 } from './solution.js';

const testInput = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

run({
    part1: {
        tests: [{ input: testInput, expected: 33 }],
        solution: part1,
    },
    part2: {
        // tests: [{ input: testInput, expected: 0 }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
