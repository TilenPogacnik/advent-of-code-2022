import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(pair => pair.split(',').map(elf => elf.split('-').map(el => Number(el))));

const pairContainsEachother = (pair) => {
  const compare = (pair1, pair2) => pair1[0] <= pair2[0] && pair1[1] >= pair2[1];
  return compare(pair[0], pair[1]) || compare (pair[1], pair[0]);
 }

const pairOverlaps = (pair) => { 
  const compare = (pair1, pair2) => pair1[1] >= pair2[0] && pair2[1] >= pair1[0];
  return compare(pair[0], pair[1]) || compare (pair[1], pair[0]);
}

const part1 = (rawInput) => {
  const elfPairs = parseInput(rawInput);
  return elfPairs.reduce((count, pair) => pairContainsEachother(pair) ? count + 1 : count, 0);
};

const part2 = (rawInput) => {
  const elfPairs = parseInput(rawInput);
  return elfPairs.reduce((count, pair) => pairOverlaps(pair) ? count + 1 : count, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
 