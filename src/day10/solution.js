//Advent of code 2022
//Day 10: Cathode-Ray Tube

const solution = (rawInput) => {
    const instructions = parseInput(rawInput);
    const [signalStrength, pixels] = executeProgram(instructions);

    console.log('\n-----------------');
    console.log('Part 1 solution: Signal strength ' + signalStrength);
    console.log('Part 2 solution: ');
    console.log(pixels);

    return signalStrength;
};

const parseInput = (rawInput) => rawInput.split('\n').map((l) => l.split(' '));

const executeProgram = (instructions) => {
    let cycle = 0;
    let X = 1;

    let pixels = '';
    let signalStrength = 0;
    let nextCycleCheck = 20;

    const runCycle = () => {
        pixels += getPixel(cycle, X);
        cycle = cycle + 1;

        if (cycle === nextCycleCheck) {
            signalStrength += nextCycleCheck * X;
            nextCycleCheck += 40;
        }
    };

    instructions.forEach((instruction) => {
        if (instruction[0] === 'noop') {
            runCycle();
        } else {
            runCycle();
            runCycle();

            X += Number(instruction[1]);
        }
    });

    return [signalStrength, pixels];
};

const getPixel = (cycle, X) => {
    const pixel = cycle % 40;
    const isLit = Math.abs(pixel - X) <= 1;
    return (pixel === 0 ? '\n' : '') + (isLit ? '#' : '.');
};

export { solution };
