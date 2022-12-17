//Advent of code 2022
//Day 17: Pyroclastic Flow

const part1 = (rawInput) => {
    return dropRocks(2022, getJetPattern(rawInput));
};

const part2 = (rawInput) => {
    return dropRocks(1000000000000, getJetPattern(rawInput));
};

const getJetPattern = (input) => input.split('').map((el) => el === '>');

const dropRocks = (count, jetPattern) => {
    const cave = new Cave(7);
    const cycle = new RockCycle();

    let maxHeight = 0;
    let currentJet = 0;
    let rockCount = count;

    for (let i = 0; i < rockCount; i++) {
        // cave.display();

        let [rockHeight, newJet] = cave.dropRock(
            rocks[i % rocks.length],
            2,
            maxHeight + 3,
            currentJet,
            jetPattern
        );
        if (rockHeight > maxHeight) maxHeight = rockHeight;
        currentJet = newJet;

        if (cycle.justStarted(i % rocks.length, currentJet, rockHeight, i)) {
            rockCount = cycle.apply(i, count);
        }
    }
    return maxHeight + cycle.getTotalHeight();
};

class Cave {
    space = [];
    constructor(width) {
        this.width = width;
        this.addHeight(1);
    }

    addHeight(height) {
        for (let i = 0; i < height; i++) {
            this.space.push(new Array(this.width).fill(false));
        }
    }

    dropRock(rock, posX, posY, currentJet, jetPattern) {
        while (true) {
            let moveX = jetPattern[currentJet] ? 1 : -1;
            currentJet = (currentJet + 1) % jetPattern.length;
            if (this.hasEmptySpace(rock, posX + moveX, posY)) posX = posX + moveX;

            if (!this.hasEmptySpace(rock, posX, posY - 1)) break;
            posY = posY - 1;
        }

        this.settleRock(rock, posX, posY);
        return [posY + rock.length, currentJet];
    }

    hasEmptySpace(rock, posX, posY) {
        if (posX < 0 || posY < 0 || posX + rock[0].length > this.space[0].length) {
            return false;
        }

        for (let y = 0; y < rock.length; y++) {
            if (posY + y >= this.space.length) continue;

            for (let x = 0; x < rock[y].length; x++) {
                if (rock[y][x] && this.space[posY + y][posX + x]) {
                    return false;
                }
            }
        }

        return true;
    }

    settleRock(rock, posX, posY) {
        if (posY + rock.length >= this.space.length) {
            this.addHeight(posY + rock.length - this.space.length);
        }

        for (let y = 0; y < rock.length; y++) {
            for (let x = 0; x < rock[y].length; x++) {
                if (rock[y][x]) {
                    this.space[posY + y][posX + x] = true;
                }
            }
        }
    }

    display() {
        for (let y = this.space.length - 1; y >= 0; y--) {
            const row = this.space[y].map((el) => (el ? '#' : '.')).join('');
            console.log(`|${row}|`);
        }
        console.log('+-------+\n\n');
    }
}

class RockCycle {
    cyclePoints = [];
    cycleLength = 0;
    cycleHeight = 0;
    cycleCount = 0;

    constructor() {
        this.observedStates = new Set();
    }

    apply(fallenRocks, totalRocks) {
        const remainingTotal = totalRocks - fallenRocks;
        this.cycleCount = Math.floor(remainingTotal / this.cycleLength);
        return fallenRocks + (remainingTotal % this.cycleLength);
    }

    getTotalHeight() {
        return this.cycleCount * this.cycleHeight;
    }

    justStarted(rockState, jetState, height, rock) {
        if (this.cycleDetected()) return false;

        let state = [rockState, jetState].join(',');
        if (this.observedStates.has(state)) {
            this.cyclePoints.push([height, rock]);

            if (this.cycleDetected()) {
                this.cycleLength = this.cyclePoints[1][1] - this.cyclePoints[0][1];
                this.cycleHeight = this.cyclePoints[1][0] - this.cyclePoints[0][0];
                return true;
            }
            this.observedStates.clear();
        }

        this.observedStates.add(state);
        return false;
    }

    cycleDetected() {
        return this.cyclePoints.length > 1;
    }
}

const rocks = [
    [[1, 1, 1, 1]],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
    ],
    [[1], [1], [1], [1]],
    [
        [1, 1],
        [1, 1],
    ],
];

export { part1, part2 };
