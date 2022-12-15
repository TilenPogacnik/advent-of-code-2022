//Advent of code 2022
//Day 15: Beacon Exclusion Zone

const part1 = (rawInput) => {
    const sensors = parseInput(rawInput);

    //We use different y for tests and final solution.
    let y = sensors.length > 14 ? 2000000 : 10;

    return getRowCoverage(sensors, y).reduce((sum, curr) => sum + (curr[1] - curr[0]), 0);
};

const part2 = (rawInput) => {
    const sensors = parseInput(rawInput);

    //We use different rowRange for tests and final solution.
    let rowRange = sensors.length > 14 ? 4000000 : 20;

    for (let y = 0; y <= rowRange; y++) {
        let rowCoverage = getRowCoverage(sensors, y);
        if (rowCoverage.length > 1) {
            return (rowCoverage[0][1] + 1) * 4000000 + y;
        }
    }
};

const parseInput = (rawInput) => {
    const getPosition = (pos) => {
        return {
            x: Number(pos.substring(pos.indexOf('x=') + 2, pos.lastIndexOf(','))),
            y: Number(pos.substring(pos.indexOf('y=') + 2)),
        };
    };
    const manhattanDistance = (from, to) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);

    return rawInput
        .split('\n')
        .map((line) => line.split(':').map((half) => getPosition(half)))
        .map((pair) => {
            pair.dist = manhattanDistance(pair[0], pair[1]);
            return pair;
        });
};

const getRowCoverage = (sensors, row) => {
    const coverage = [];
    for (const s of sensors) {
        let sensorCoverage = getSensorRowCoverage(s, row);
        if (sensorCoverage) coverage.push(sensorCoverage);
    }

    return mergeIntervals(coverage);
};

const getSensorRowCoverage = (sensor, y) => {
    let coverageWidth = sensor.dist - Math.abs(sensor[0].y - y);
    if (coverageWidth < 0) return null;

    return [sensor[0].x - coverageWidth, sensor[0].x + coverageWidth];
};

const mergeIntervals = (intervals) => {
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    let prev = intervals[0];

    for (let i = 0; i < intervals.length; i++) {
        let curr = intervals[i];
        if (prev[1] >= curr[0] - 1) {
            prev = [prev[0], Math.max(prev[1], curr[1])];
        } else {
            merged.push(prev);
            prev = curr;
        }
    }

    merged.push(prev);
    return merged;
};

export { part1, part2 };
