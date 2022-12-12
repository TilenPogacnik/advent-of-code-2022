//Advent of code 2022
//Day 12: Hill Climbing Algorithm

const part1 = (rawInput) => {
    const [heightMap, startPos, targetPos] = parseInput(rawInput, false);

    const isValidMove = (currHeight, nextHeight) => nextHeight < currHeight + 2;
    const isTargetPosition = (row, col) => [row, col].toString() === targetPos.toString();
    return BFS(heightMap, ...startPos, isValidMove, isTargetPosition, DIRECTIONS);
};

const part2 = (rawInput) => {
    const [heightMap, _, startPos] = parseInput(rawInput, false);

    const isValidMove = (currHeight, nextHeight) => nextHeight > currHeight - 2;
    const isTargetPosition = (row, col) => heightMap[row][col] === 'a'.charCodeAt(0);
    return BFS(heightMap, ...startPos, isValidMove, isTargetPosition, DIRECTIONS);
};

const parseInput = (rawInput) => {
    let startPos,
        targetPos = [0, 0];

    let heightMap = rawInput.split('\n').map((line, i) =>
        line.split('').map((square, j) => {
            if (square === 'S') {
                startPos = [i, j];
                square = 'a';
            }
            if (square === 'E') {
                targetPos = [i, j];
                square = 'z';
            }

            return square.charCodeAt(0);
        })
    );

    return [heightMap, startPos, targetPos];
};

//isValidMove: function (currentValue, nextValue) => should return true if we are allowed to move from current cell to next cell
//finishReached: function (row, col) => should return true if grid position grid[row][col] is our target position
function BFS(grid, startRow, startCol, isValidMove, finishReached, directions) {
    const isCellValid = (row, col, grid, visited) => {
        //Returns true if cell is within grid bounds and hasn't been visited
        if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) return false;
        if (visited[row][col]) return false;
        return true;
    };

    const visitedCells = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false));
    const queue = [];

    // Mark the starting cell as visited and push it into the queue
    queue.push([startRow, startCol, 0]);
    visitedCells[startRow][startCol] = true;

    while (queue.length != 0) {
        const [row, col, length] = queue.shift();
        const currentVal = grid[row][col];

        for (const direction of directions) {
            const adjRow = row + direction[0];
            const adjCol = col + direction[1];

            if (isCellValid(adjRow, adjCol, grid, visitedCells)) {
                const nextVal = grid[adjRow][adjCol];

                if (isValidMove(currentVal, nextVal)) {
                    if (finishReached(adjRow, adjCol)) return length + 1;

                    queue.push([adjRow, adjCol, length + 1]);
                    visitedCells[adjRow][adjCol] = true;
                }
            }
        }
    }
}

const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

export { part1, part2 };
