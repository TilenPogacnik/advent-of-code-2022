//Advent of code 2022
//Day 23: Unstable Diffusion
import { padNumericArray } from '../utils/index.js';

const part1 = (rawInput) => {
    let map = parseInput(rawInput);

    for (let i = 0; i < 10; i++) {
        map = moveElves(map, i)[0];
    }

    return countEmptyTiles(map);
};

const part2 = (rawInput) => {
    let map = parseInput(rawInput);

    let round = 0;
    let elfMoved = false;
    do {
        [map, elfMoved] = moveElves(map, round);
        round++;
    } while (elfMoved);

    return round;
};

const moveElves = (map, roundDirection) => {
    if (!areEdgesEmpty(map)) {
        map = padNumericArray(map, 0, 1);
    }
    const [positionCrowdedness, movePropositions] = createMovePropositions(map, roundDirection);
    return executeMoves(map, movePropositions, positionCrowdedness);
};

const areEdgesEmpty = (map) => {
    //Side edges
    for (let i = 0; i < map.length; i++) {
        if (map[i][0] || map[i][map[i].length - 1]) {
            return false;
        }
    }
    //Top and bottom edges
    for (let i = 0; i < map[0].length; i++) {
        if (map[0][i] || map[map[i].length - 1][i]) {
            return false;
        }
    }

    return true;
};

const createMovePropositions = (map, roundDirection) => {
    const positionCrowdedness = new Map();
    const movePropositions = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (!map[y][x]) continue;
            if (!hasAdjacentElf(x, y, map)) continue;

            for (let dir = 0; dir < DIRECTIONS.length; dir++) {
                const direction = DIRECTIONS[(dir + roundDirection) % DIRECTIONS.length];
                if (!canMoveInDirection(direction, x, y, map)) continue;

                const targetX = x + direction.x;
                const targetY = y + direction.y;
                const targetString = coordinateToString(targetX, targetY);

                positionCrowdedness.set(
                    targetString,
                    positionCrowdedness.has(targetString) ? 2 : 1
                );
                movePropositions.push({ fromX: x, toX: targetX, fromY: y, toY: targetY });
                break;
            }
        }
    }

    return [positionCrowdedness, movePropositions];
};

const hasAdjacentElf = (x, y, map) => {
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            if (i === y && j === x) continue;

            if (map[i][j]) return true;
        }
    }

    return false;
};

const canMoveInDirection = (direction, x, y, map) => {
    for (let [dx, dy] of direction.adjacentChecks) {
        if (map[y + dy][x + dx]) return false;
    }

    return true;
};

const coordinateToString = (x, y) => {
    return x + ',' + y;
};

const executeMoves = (map, movePropositions, positionCrowdedness) => {
    let moveCount = 0;
    for (const proposedMove of movePropositions) {
        if (positionCrowdedness.get(coordinateToString(proposedMove.toX, proposedMove.toY)) > 1)
            continue;

        map[proposedMove.fromY][proposedMove.fromX] = 0;
        map[proposedMove.toY][proposedMove.toX] = 1;
        moveCount++;
    }

    return [map, moveCount];
};

const countEmptyTiles = (map) => {
    let xBounds = [Number.MAX_SAFE_INTEGER, 0];
    let yBounds = [Number.MAX_SAFE_INTEGER, 0];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (!map[y][x]) continue;
            xBounds = [Math.min(x, xBounds[0]), Math.max(x, xBounds[1])];
            yBounds = [Math.min(y, yBounds[0]), Math.max(y, yBounds[1])];
        }
    }

    let sum = 0;
    for (let y = yBounds[0]; y <= yBounds[1]; y++) {
        for (let x = xBounds[0]; x <= xBounds[1]; x++) {
            sum += 1 - map[y][x];
        }
    }

    return sum;
};

const parseInput = (rawInput) => {
    return rawInput.split('\n').map((line) => line.split('').map((el) => (el === '#' ? 1 : 0)));
};

class Direction {
    constructor(name, x, y, ...adjacentChecks) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.adjacentChecks = adjacentChecks;
    }
}
const DIRECTIONS = [
    new Direction('NORTH', 0, -1, [-1, -1], [0, -1], [1, -1]),
    new Direction('SOUTH', 0, 1, [-1, 1], [0, 1], [1, 1]),
    new Direction('WEST', -1, 0, [-1, -1], [-1, 0], [-1, 1]),
    new Direction('EAST', 1, 0, [1, -1], [1, 0], [1, 1]),
];

export { part1, part2 };
