//Advent of code 2022
//Day 14: Regolith Reservoir

const part1 = (rawInput) => {
    const walls = parseInput(rawInput);
    const grid = initGrid(walls, false);

    const startPoint = [0, 500];
    return simulateSand(grid, startPoint);
};

const part2 = (rawInput) => {
    const walls = parseInput(rawInput);
    const grid = initGrid(walls, true);

    const startPoint = [0, 500];
    return simulateSand(grid, startPoint);
};

const parseInput = (rawInput) =>
    rawInput.split('\n').map((c) => c.split(' -> ').map((r) => r.split(',')));

const initGrid = (walls, createFloor) => {
    const grid = Array.from(Array(1000), () => Array(1000).fill(false));

    if (createFloor) {
        const lowestPoint = Math.max(
            ...walls.reduce((res, wall) => res.concat(wall), []).map((point) => point[1])
        );
        const floorHeight = lowestPoint + 2;
        walls.push([
            [0, floorHeight],
            [grid.length - 1, floorHeight],
        ]);
    }

    for (const wall of walls) {
        for (let i = 0; i < wall.length - 1; i++) {
            for (const point of pointsBetween(wall[i], wall[i + 1])) {
                grid[point[1]][point[0]] = true;
            }
        }
    }

    return grid;
};

const pointsBetween = (start, end) => {
    const points = [];
    for (let x = Math.min(start[0], end[0]); x <= Math.max(start[0], end[0]); x++) {
        for (let y = Math.min(start[1], end[1]); y <= Math.max(start[1], end[1]); y++) {
            points.push([x, y]);
        }
    }
    return points;
};

const simulateSand = (grid, startPosition) => {
    let sandCount = 0;
    while (canDropSandParticle(grid, startPosition)) {
        sandCount++;
    }
    return sandCount;
};

const canDropSandParticle = (grid, startPosition) => {
    let currPos = startPosition;

    if (grid[currPos[0]][currPos[1]]) {
        //Start position is filled, cant drop sand
        return false;
    }

    while (currPos[0] + 1 < grid.length) {
        const nextPosCandidates = [
            [currPos[0] + 1, currPos[1]],
            [currPos[0] + 1, currPos[1] - 1],
            [currPos[0] + 1, currPos[1] + 1],
        ];

        let moved = false;
        for (const nextPos of nextPosCandidates) {
            if (!grid[nextPos[0]][nextPos[1]]) {
                currPos = nextPos;
                moved = true;
                break;
            }
        }

        if (!moved) {
            grid[currPos[0]][currPos[1]] = true;
            return true;
        }
    }

    return false;
};

export { part1, part2 };
