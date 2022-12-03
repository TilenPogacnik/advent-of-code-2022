import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const simulateGame = (rounds, getRoundScore) => {
  return rounds.reduce((score, round) => score + getRoundScore(round), 0);
};

const part1 = (rawInput) => {
  const rounds = parseInput(rawInput);

  const getRoundScore = (round) => {
    let score = 0;
    const play = round.split(" ");
    if (play[1] === "X") {
      score += play[0] === "A" ? 4 : play[0] === "B" ? 1 : 7;
    } else if (play[1] === "Y") {
      score += play[0] === "A" ? 8 : play[0] === "B" ? 5 : 2;
    } else {
      score += play[0] === "A" ? 3 : play[0] === "B" ? 9 : 6;
    }

    return score;
  };

  return simulateGame(rounds, getRoundScore);
};

const part2 = (rawInput) => {
  const rounds = parseInput(rawInput);

  const getRoundScore = (round) => {
    let score = 0;
    const play = round.split(" ");
    if (play[1] === "X") {
      score += play[0] === "A" ? 3 : play[0] === "B" ? 1 : 2;
    } else if (play[1] === "Y") {
      score += play[0] === "A" ? 4 : play[0] === "B" ? 5 : 6;
    } else {
      score += play[0] === "A" ? 8 : play[0] === "B" ? 9 : 7;
    }

    return score;
  };

  return simulateGame(rounds, getRoundScore);
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
