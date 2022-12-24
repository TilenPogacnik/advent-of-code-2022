//Advent of code 2022
//Day 24: Blizzard Basin
import { lcm_two_numbers, mod } from '../utils/index.js';

const part1 = (rawInput) => {
    const baseMap = parseInput(rawInput);
    const maps = generateMaps(baseMap);

    const [startX, startY] = [1, 0];
    const [endX, endY] = [baseMap[0].length - 2, baseMap.length - 1];

    return bfs(maps, 0, startX, startY, endX, endY);
};

const part2 = (rawInput) => {
    const baseMap = parseInput(rawInput);
    const maps = generateMaps(baseMap);

    const [startX, startY] = [1, 0];
    const [endX, endY] = [baseMap[0].length - 2, baseMap.length - 1];

    let time = bfs(maps, 0, startX, startY, endX, endY);
    time = bfs(maps, time, endX, endY, startX, startY);
    time = bfs(maps, time, startX, startY, endX, endY);

    return time;
};

const bfs = (maps, startTime, startX, startY, endX, endY) => {
    const explored = new Set();
    const positionIsExplored = (pos) => {
        const alreadyExplored = explored.has(pos);
        explored.add(pos);
        return alreadyExplored;
    };

    const queue = [];
    queue.push([startTime, startX, startY]);

    while (queue.length > 0) {
        let [time, x, y] = queue.shift();

        if (positionIsExplored([time % maps.length, x, y].join())) {
            continue;
        }

        if (x === endX && y === endY) {
            return time;
        }

        const nextTime = time + 1;
        const nextMap = maps[nextTime % maps.length];

        for (const [xDirection, yDirection] of Object.values(DIRECTIONS)) {
            const newX = x + xDirection;
            const newY = y + yDirection;

            if (newX < 0 || newX > nextMap[0].length - 1) continue;
            if (newY < 0 || newY > nextMap.length - 1) continue;
            if (nextMap[newY][newX]) continue;

            queue.push([nextTime, newX, newY]);
        }
    }
};

const generateMaps = (baseMap) => {
    const simulateBlizzard = (x, y, direction) => {
        for (let time = 0; time < maps.length; time++) {
            const newX = mod(x - 1 + direction[0] * time, baseMap[0].length - 2) + 1;
            const newY = mod(y - 1 + direction[1] * time, baseMap.length - 2) + 1;
            maps[time][newY][newX] += 1;
        }
    };

    const lcm = lcm_two_numbers(baseMap.length - 2, baseMap[0].length - 2);
    const maps = Array.from(Array(lcm), () =>
        baseMap.map((line) => line.map((pos) => (pos === '#' ? 1 : 0)))
    );

    for (let y = 0; y < baseMap.length; y++) {
        for (let x = 0; x < baseMap[0].length; x++) {
            if (!'<>^v'.includes(baseMap[y][x])) continue;
            simulateBlizzard(x, y, DIRECTIONS[baseMap[y][x]]);
        }
    }

    return maps;
};

const parseInput = (rawInput) => rawInput.split('\n').map((line) => line.split(''));

const DIRECTIONS = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    v: [0, 1],
    None: [0, 0],
};

export { part1, part2 };
