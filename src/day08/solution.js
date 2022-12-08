//Advent of code 2022
//Day 8: Treetop Tree House

const part1 = (rawInput) => {
    const treeMap = parseTreeMap(rawInput);

    let visibleTrees = 0;
    for (let i = 0; i < treeMap.length; i++) {
        for (let j = 0; j < treeMap[i].length; j++) {
            if (isTreeVisible(i, j, treeMap)) visibleTrees++;
        }
    }

    return visibleTrees;
};

const part2 = (rawInput) => {
    const treeMap = parseTreeMap(rawInput);

    let bestScenicScore = 0;
    for (let i = 0; i < treeMap.length; i++) {
        for (let j = 0; j < treeMap[0].length; j++) {
            bestScenicScore = Math.max(calculateScenicScore(i, j, treeMap), bestScenicScore);
        }
    }

    return bestScenicScore;
};

const parseTreeMap = (rawInput) =>
    rawInput.split('\n').map((row) => row.split('').map((tree) => Number(tree)));

const isTreeVisible = (x, y, treeMap) => {
    const tree = treeMap[y][x];
    for (const [xDir, yDir] of directions) {
        let x2 = x;
        let y2 = y;

        do {
            x2 += xDir;
            y2 += yDir;

            //Tree is visible if we reach the edge of the map before finding a larger tree
            if (!isValidCoordinate(x2, y2, treeMap)) {
                return true;
            }
        } while (treeMap[y2][x2] < tree);
    }
    return false;
};

const isValidCoordinate = (x, y, map) => {
    return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
};

function calculateScenicScore(x, y, map) {
    let scenicScore = 1;
    for (const direction of directions) {
        scenicScore *= getViewingDistance(direction, x, y, map);
    }
    return scenicScore;
}

const getViewingDistance = ([xDir, yDir], x, y, map) => {
    let viewingDistance = 0;
    let x2 = x,
        y2 = y;

    do {
        x2 += xDir;
        y2 += yDir;
        if (!isValidCoordinate(x2, y2, map)) break;
        viewingDistance++;
    } while (map[y2][x2] < map[y][x]); // Stop when the current tree is the same height or taller than the starting tree

    return viewingDistance;
};

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

export { part1, part2 };
