//Advent of code 2022
//Day 18: Boiling Boulders

const part1 = (rawInput) => {
    const grid = createGrid(parseCubes(rawInput), 0, 1);
    return getSurfaceArea(grid);
};

const part2 = (rawInput) => {
    const grid = createGrid(parseCubes(rawInput), 2, 1);
    floodFill(grid, 0, 0, 0, 0);
    return getSurfaceArea(grid);
};

const createGrid = (cubes, emptyVal, fullVal) => {
    const size = getSpaceRequirements(cubes);
    const grid = Array.from(Array(size[0] + 1), () =>
        Array.from(Array(size[1] + 1), () => Array(size[2] + 1).fill(emptyVal))
    );
    for (const cube of cubes) {
        grid[cube[0]][cube[1]][cube[2]] = fullVal;
    }

    return grid;
};

const getSpaceRequirements = (cubes) => {
    const max = [0, 0, 0];
    for (const cube of cubes) {
        for (let i = 0; i < cube.length; i++) {
            max[i] = Math.max(max[i], cube[i]);
        }
    }

    return max;
};

const floodFill = (grid, x, y, z, newVal) => {
    const fill = (grid, x, y, z, newVal, currVal) => {
        if (x < 0 || y < 0 || z < 0) return;
        if (x > grid.length - 1 || y > grid[0].length - 1 || z > grid[0][0].length - 1) return;
        if (grid[x][y][z] !== currVal) return;

        grid[x][y][z] = newVal;
        fill(grid, x + 1, y, z, newVal, currVal);
        fill(grid, x - 1, y, z, newVal, currVal);
        fill(grid, x, y + 1, z, newVal, currVal);
        fill(grid, x, y - 1, z, newVal, currVal);
        fill(grid, x, y, z + 1, newVal, currVal);
        fill(grid, x, y, z - 1, newVal, currVal);
    };

    const currVal = grid[x][y][z];
    if (currVal === newVal) return;

    fill(grid, x, y, z, newVal, currVal);
};

const getSurfaceArea = (grid) => {
    let surfaceArea = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            for (let k = 0; k < grid[i][j].length; k++) {
                surfaceArea += calculateCubeSurface(i, j, k, grid);
            }
        }
    }

    return surfaceArea;
};

const calculateCubeSurface = (x, y, z, grid) => {
    if (!grid[x][y][z]) return 0;
    //Check all neighbors - one exposed side for every empty neighbor
    let surface = 0;
    if (x === grid.length - 1 || !grid[x + 1][y][z]) surface++;
    if (x === 0 || !grid[x - 1][y][z]) surface++;
    if (y === grid[0].length - 1 || !grid[x][y + 1][z]) surface++;
    if (y === 0 || !grid[x][y - 1][z]) surface++;
    if (z === grid[0][0].length - 1 || !grid[x][y][z + 1]) surface++;
    if (z === 0 || !grid[x][y][z - 1]) surface++;

    return surface;
};

const parseCubes = (rawInput) =>
    rawInput.split('\n').map((line) => line.split(',').map((pos) => Number(pos)));

export { part1, part2 };
