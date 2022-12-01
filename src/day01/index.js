import run from "aocrunner";
import _ from 'lodash';

const parseInput = (rawInput) => rawInput.split("\n\n").map(inp => _.sumBy(inp.split('\n'), i => Number(i)));

const mostCalories = (input, elfCount) => { 
  return _.sum(_.sortBy(input).slice(-elfCount));
}

const part1 = (rawInput) => {
  return mostCalories(parseInput(rawInput), 1)
};

const part2 = (rawInput) => {
  return mostCalories(parseInput(rawInput), 3)
}; 

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
