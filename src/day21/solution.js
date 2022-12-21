//Advent of code 2022
//Day 21: Monkey Math

import { binarySearch } from '../utils/index.js';

const part1 = (rawInput) => {
    const monkeys = parseInput(rawInput);
    const nums = getNumbers(monkeys);
    return nums.get('root');
};

const part2 = (rawInput) => {
    const monkeys = parseInput(rawInput);
    const root = monkeys.find((m) => m[0] === 'root');

    const getRootDiff = (humanVal) => {
        const nums = getNumbers(monkeys, true, humanVal);
        return nums.get(root[1][0]) - nums.get(root[1][2]);
    };
    return binarySearch([0, Number.MAX_SAFE_INTEGER], 0, getRootDiff);
};

const getNumbers = (monkeys, humanOverride = false, humanVal = 0) => {
    const map = new Map();

    let i = -1;
    while (map.size < monkeys.length) {
        i = (i + 1) % monkeys.length;
        const m = monkeys[i];
        if (map.get(m[0])) continue;

        if (humanOverride && m[0] === 'humn') m[1] = [humanVal];
        if (m[1].length === 1) {
            map.set(m[0], Number(m[1]));
            continue;
        }

        if (!map.has(m[1][0]) || !map.has(m[1][2])) continue;
        map.set(m[0], getMonkeyValue(m, map));
    }

    return map;
};

const getMonkeyValue = (monkey, map) => {
    const left = map.get(monkey[1][0]);
    const right = map.get(monkey[1][2]);

    switch (monkey[1][1]) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '/':
            if (right === 0) console.log('DIVISION BY ZERO!!!!');
            return left / right;
        case '*':
            return left * right;
    }
};

const parseInput = (rawInput) =>
    rawInput
        .split('\n')
        .map((line) => line.split(': ').map((x, i) => (i === 0 ? x : x.split(' '))));

export { part1, part2 };
