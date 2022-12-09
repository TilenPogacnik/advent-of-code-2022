//Advent of code 2022
//Day 9: Rope Bridge

import { sumArrays } from '../utils/index.js';

const part1 = (rawInput) => {
    const motions = parseInput(rawInput);
    return simulateRope(motions, 2);
};

const part2 = (rawInput) => {
    const motions = parseInput(rawInput);
    return simulateRope(motions, 10);
};

const parseInput = (rawInput) => rawInput.split('\n').map((l) => l.split(' '));

const simulateRope = (motions, ropeLength) => {
    let rope = Array.from({ length: ropeLength }, () => [0, 0]);

    const visitedPositions = new Set();
    visitedPositions.add(rope[0].toString());

    motions.forEach((motion) => {
        const direction = DIRECTIONS[motion[0]];
        const moveCount = motion[1];

        for (let i = 0; i < moveCount; i++) {
            rope = moveRope(direction, rope);
            visitedPositions.add(rope[rope.length - 1].toString());
        }
    });

    return visitedPositions.size;
};

const moveRope = (direction, rope) => {
    //Move head
    rope[0] = sumArrays(rope[0], direction);

    //Move rest of the knots
    for (let j = 1; j < rope.length; j++) {
        rope[j] = moveKnot(rope[j], rope[j - 1]);
    }
    return rope;
};

const moveKnot = (knot, prevKnot) => {
    if (getDistance(knot, prevKnot) <= 1) return knot;

    let diff = [prevKnot[0] - knot[0], prevKnot[1] - knot[1]];
    let moveVector = diff.map((val) => (val === 0 ? 0 : val / Math.abs(val)));
    return sumArrays(knot, moveVector);
};

const getDistance = ([fromX, fromY], [toX, toY]) => {
    let distance = [toX - fromX, toY - fromY].map((d) => Math.abs(d));
    return Math.max(...distance);
};

const DIRECTIONS = {
    L: [-1, 0], //Left
    R: [1, 0], //Right
    U: [0, 1], //Up
    D: [0, -1], //Down
};

export { part1, part2 };
