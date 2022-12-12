//Advent of code 2022
//Day 11: Monkey in the Middle

const part1 = (rawInput) => {
    const monkeys = parseInput(rawInput);
    simulateRounds(monkeys, 20, 3);
    return getMostActiveMonkeys(monkeys, 2);
};

const part2 = (rawInput) => {
    const monkeys = parseInput(rawInput);
    simulateRounds(monkeys, 10000, 1);
    return getMostActiveMonkeys(monkeys, 2);
};

const parseInput = (rawInput) => {
    return rawInput.split('\n\n').map((m) => parseMonkey(m));
};

const parseMonkey = (monkeyInput) => {
    const rawMonkey = monkeyInput.split('\n');
    return {
        items: rawMonkey[1]
            .split('Starting items: ')[1]
            .split(', ')
            .map((i) => Number(i)),
        operation: rawMonkey[2].split('Operation: new = old ')[1].split(' '),
        testNum: Number(rawMonkey[3].split('Test: divisible by ')[1]),
        trueMonkey: Number(rawMonkey[4].split('If true: throw to monkey ')[1]),
        falseMonkey: Number(rawMonkey[5].split('If false: throw to monkey ')[1]),
        inspectCount: 0,
    };
};

const simulateRounds = (monkeys, rounds, worryDivisor) => {
    let moduloTest = monkeys.reduce((result, monkey) => result * monkey.testNum, 1);
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach((monkey) => takeTurn(monkey, monkeys, worryDivisor, moduloTest));
    }
};

const takeTurn = (monkey, monkeys, worryDivisor, moduloTest) => {
    while (monkey.items.length > 0) {
        const item = doOperation(monkey.items.shift(), monkey.operation, moduloTest, worryDivisor);
        const target = item % monkey.testNum === 0 ? monkey.trueMonkey : monkey.falseMonkey;
        monkeys[target].items.push(item);
        monkey.inspectCount++;
    }
};

const doOperation = (item, operation, moduloTest, worryDivisor) => {
    if (operation[1] === 'old') {
        item *= item;
    } else {
        const op = Number(operation[1]);
        item = operation[0] === '*' ? item * op : item + op;
    }
    return Math.floor((item % moduloTest) / worryDivisor);
};

const getMostActiveMonkeys = (monkeys, count) => {
    return monkeys
        .map((monkey) => monkey.inspectCount)
        .sort((a, b) => a - b)
        .slice(-count)
        .reduce((result, monkey) => (result *= monkey), 1);
};

export { part1, part2 };
