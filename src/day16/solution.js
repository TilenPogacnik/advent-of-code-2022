//Advent of code 2022
//Day 16: Proboscidea Volcanium

const part1 = (rawInput) => {
    const valves = parseInput(rawInput);
    const distances = generateDistanceArray(valves);
    return dfs(valves, distances, 30)[0];
};

const part2 = (rawInput) => {
    const valves = parseInput(rawInput);
    const distances = generateDistanceArray(valves);

    const [_, paths] = dfs(valves, distances, 26);

    let maxFlow = 0;
    for (let myPath of paths) {
        for (let elephantPath of paths) {
            let combinedFlow = myPath.totalFlow + elephantPath.totalFlow;
            if (combinedFlow > maxFlow && !overlaps(myPath.valves, elephantPath.valves)) {
                maxFlow = combinedFlow;
            }
        }
    }
    return maxFlow;
};

const overlaps = (arrA, arrB) => arrA.filter((x) => arrB.includes(x)).length > 0;

const dfs = (valves, distances, time) => {
    let paths = [
        {
            remainingTime: time,
            currValve: 0,
            unavailableValves: valves.map((valve) => valve.flowRate < 1),
            valves: [],
            totalFlow: 0,
        },
    ];

    const possiblePaths = [];
    let maxFlow = 0;
    while (paths.length > 0) {
        const path = paths.pop();

        possiblePaths.push(path);
        if (path.remainingTime <= 0 || path.unavailableValves.every((el) => el === true)) {
            if (path.totalFlow > maxFlow) maxFlow = path.totalFlow;
            continue;
        }

        for (let valve = 0; valve < valves.length; valve++) {
            if (valve === path.currValve) continue;
            if (path.unavailableValves[valve]) continue;

            const newRemainingTime = path.remainingTime - distances[valve][path.currValve] - 1;
            if (newRemainingTime < 0) continue;

            const unavailableValves = [...path.unavailableValves];
            unavailableValves[valve] = true;

            paths.push({
                remainingTime: newRemainingTime,
                currValve: valve,
                unavailableValves: unavailableValves,
                valves: [...path.valves, valve],
                totalFlow: path.totalFlow + valves[valve].flowRate * newRemainingTime,
            });
        }
    }

    return [maxFlow, possiblePaths];
};

const generateDistanceArray = (valves) => {
    //Create distance matrix using Floyd Warshall algorithm
    const distance = Array.from(Array(valves.length), () =>
        Array(valves.length).fill(Number.POSITIVE_INFINITY)
    );

    for (const valve of valves) {
        for (const connection of valve.connections) {
            distance[valve.name][connection] = 1;
        }
        distance[valve.name][valve.name] = 0;
    }
    for (let k = 0; k < valves.length; k++) {
        for (let i = 0; i < valves.length; i++) {
            for (let j = 0; j < valves.length; j++) {
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j];
                }
            }
        }
    }

    return distance;
};

const parseInput = (rawInput) => {
    const parseValve = (line) => {
        let name = line.substring(6, 8);
        let flowRate = line.match(/\d+/)[0];
        let connections = line
            .split('to valve')[1]
            .split(',')
            .map((conn) => conn.trim());
        if (connections[0].length > 2) {
            connections[0] = connections[0].substring(2);
        }
        return { name: name, flowRate: Number(flowRate), connections: connections };
    };

    const valves = rawInput
        .split('\n')
        .map((line) => parseValve(line))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((valve, i) => {
            valve.oldName = valve.name;
            valve.name = i;
            return valve;
        });

    for (const valve of valves) {
        valve.connections = valve.connections.map((conn) =>
            valves.map((v) => v.oldName).indexOf(conn)
        );
    }
    return valves;
};

export { part1, part2 };
