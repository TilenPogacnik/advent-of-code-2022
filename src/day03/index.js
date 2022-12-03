import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const getCommonItem = (...parts) => {
  let commonItems = new Array(53).fill(true);

  parts.forEach((part) => {
    let currentItems = new Array(53).fill(false);

    part.split("").forEach((item) => {
      const itemValue = getItemValue(item);
      currentItems[itemValue] = commonItems[itemValue];
    });
    
    commonItems = commonItems.map((val, i) => val && currentItems[i]);
  });

  return commonItems.indexOf(true);
};

const getItemValue = (item) => {
  const offset = item === item.toUpperCase() ? 38 : 96;
  return item.charCodeAt(0) - offset;
};

const part1 = (rawInput) => {
  const rucksacks = parseInput(rawInput);
  let result = 0;

  rucksacks.forEach((rucksack) => {
    const firstHalf = rucksack.slice(0, rucksack.length / 2);
    const secondHalf = rucksack.slice(rucksack.length / 2);

    const commonItem = getCommonItem(firstHalf, secondHalf);
    result += commonItem;
  });

  return result;
};

const part2 = (rawInput) => {
  const rucksacks = parseInput(rawInput);
  let result = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const commonItem = getCommonItem(
      rucksacks[i],
      rucksacks[i + 1],
      rucksacks[i + 2],
    );
    result += commonItem;
  }
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
