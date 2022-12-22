//Advent of code 2022
//Day 22: Monkey Map

const DIRECTIONS = [
    [0, 1], //Right
    [1, 0], //Down
    [0, -1], //Left
    [-1, 0], //Up
];

const part1 = (rawInput) => {
    const [map, instructions] = parseInput(rawInput);

    const wrapPosition = (x, y, dir) => {
        if (!(y < 0 || y >= map.length || x < 0 || x >= map[y].length || map[y][x] === -1)) {
            //No need to wrap, return unmodified position
            return [x, y, dir];
        }

        x = mod(x, map[0].length);
        y = mod(y, map.length);

        while (map[y][x] === -1) {
            x = mod(x + DIRECTIONS[dir][1], map[0].length);
            y = mod(y + DIRECTIONS[dir][0], map.length);
        }
        return [x, y, dir];
    };

    const [posY, posX, dir] = executeInstructions(map, instructions, wrapPosition);
    return 1000 * (posY + 1) + 4 * (posX + 1) + dir;
};

const part2 = (rawInput) => {
    const [map, instructions] = parseInput(rawInput);

    const wrapPosition = (x, y, dir) => {
        if (!(y < 0 || y >= map.length || x < 0 || x >= map[y].length || map[y][x] === -1)) {
            //No need to wrap, return unmodified position
            return [x, y, dir];
        }

        switch (dir) {
            case 0: //right
                if (y < 50) {
                    return [99, 149 - y, 2];
                } else if (y < 100) {
                    return [y + 50, 49, 3];
                } else if (y < 150) {
                    return [149, 149 - y, 2];
                } else {
                    return [y - 100, 149, 3];
                }
            case 1: //down
                if (x < 50) {
                    return [x + 100, 0, 1];
                } else if (x < 100) {
                    return [49, x + 100, 2];
                } else {
                    return [99, x - 50, 2];
                }
            case 2: //left;
                if (y < 50) {
                    return [0, 149 - y, 0];
                } else if (y < 100) {
                    return [y - 50, 100, 1];
                } else if (y < 150) {
                    return [50, 149 - y, 0];
                } else {
                    return [y - 100, 0, 1];
                }
            case 3: //up
                if (x < 50) {
                    return [50, x + 50, 0];
                } else if (x < 100) {
                    return [0, x + 100, 0];
                } else {
                    return [x - 100, 199, 3];
                }
        }
    };

    const [posY, posX, dir] = executeInstructions(map, instructions, wrapPosition);
    return 1000 * (posY + 1) + 4 * (posX + 1) + dir;
};

const executeInstructions = (map, instructions, wrap) => {
    let posY = 0;
    let posX = map[0].findIndex((tile) => tile === 0);
    let currDir = 0;

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];

        if (instruction === 'L') {
            currDir = mod(currDir - 1, DIRECTIONS.length);
            continue;
        }
        if (instruction === 'R') {
            currDir = mod(currDir + 1, DIRECTIONS.length);
            continue;
        }

        for (let moveCount = 0; moveCount < instruction; moveCount++) {
            let [newX, newY, newDir] = wrap(
                posX + DIRECTIONS[currDir][1],
                posY + DIRECTIONS[currDir][0],
                currDir
            );
            if (map[newY][newX] === 1) break;

            posX = newX;
            posY = newY;
            currDir = newDir;
        }
    }

    return [posY, posX, currDir];
};

const parseInput = (rawInput) => {
    const lines = rawInput.split('\n');
    const instructions = parseInstructions(lines.pop());

    lines.pop();
    const maxLen = Math.max(...lines.map((l) => l.length));
    const map = lines.map((line) =>
        line
            .padEnd(maxLen, ' ')
            .split('')
            .map((tile) => (tile === '#' ? 1 : tile === '.' ? 0 : -1))
    );

    return [map, instructions];
};

function parseInstructions(str) {
    const result = [];

    let current = '';
    for (const c of str) {
        if (c === 'L' || c === 'R') {
            result.push(parseInt(current, 10));
            result.push(c);
            current = '';
        } else {
            current += c;
        }
    }

    if (current) {
        result.push(parseInt(current, 10));
    }

    return result;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export { part1, part2 };
