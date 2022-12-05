import run from "aocrunner";

const parseStackInput = (stackInfo) => {
  const stacks = [];
  for (let i = 0; i < stackInfo.length - 1; i++) {
    for (let j = 0; j < stackInfo[i].length/4; j++){
        if (!stacks[j]) stacks[j] = [];
        const crate = stackInfo[i].charAt(j*4 + 1);
        if (crate !== ' ') stacks[j].unshift(crate);
    }
  }
  return stacks;
}

const parseMoveInstructions = (moveInstructions) => {
  //Returns instructions in [moveCount, fromStack, toStack] format
  return moveInstructions.map(line => line.replace(/\D+/g, ' ').trim().split(' ').map(i => Number(i)));
}

const parseInput = (rawInput) => {
  const [stackInfo, instructions] = rawInput.split("\n\n").map(line => line.split('\n'));
  return [parseStackInput(stackInfo), parseMoveInstructions(instructions)];
}

const rearrangeStacks = (stacks, instructions, canMoveMultiple = false) => {
  const moveCrates = (count, from, to) => {
    const cratesToMove = stacks[from - 1].splice(-count, count);
    stacks[to - 1].push(...cratesToMove);
  }

  instructions.forEach(([moveCount, fromStack, toStack]) => {
    if (canMoveMultiple) {
      moveCrates(moveCount, fromStack, toStack);
    } else {
      for (let i = 0; i < moveCount; i++){
        moveCrates(1, fromStack, toStack);
      }
    }
  });

  return stacks;
}

const part1 = (rawInput) => {
  const [stacks, instructions] = parseInput(rawInput);
  const rearrangedStacks = rearrangeStacks(stacks, instructions, false);
  return rearrangedStacks.map(stack => stack.pop()).join('');
};

const part2 = (rawInput) => {
  const [stacks, instructions] = parseInput(rawInput);
  const rearrangedStacks = rearrangeStacks(stacks, instructions, true);
  return rearrangedStacks.map(stack => stack.pop()).join('');
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  // onlyTests: true,
}
);
