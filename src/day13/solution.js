//Advent of code 2022
//Day 13: Distress Signal

function compareValues(left, right) {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) return 1;
        if (left > right) return -1;
        return 0;
    }

    if (typeof left === 'number') {
        left = [left];
    }
    if (typeof right === 'number') {
        right = [right];
    }

    for (let i = 0; i < left.length; i++) {
        if (right.length <= i) return -1;

        const result = compareValues(left[i], right[i]);
        if (result !== 0) return result;
    }

    if (left.length < right.length) return 1;

    return 0;
}

const part1 = (rawInput) => {
    const packetPairs = rawInput
        .split('\n\n')
        .map((pair) => pair.split('\n').map((packet) => JSON.parse(packet)));

    let result = 0;
    packetPairs.forEach((pair, i) => {
        if (compareValues(pair[0], pair[1]) > 0) result += i + 1;
    });
    return result;
};

const part2 = (rawInput) => {
    rawInput += '\n[[2]]\n[[6]]';
    const packets = rawInput
        .split('\n')
        .filter((line) => line.length > 0)
        .map((packet) => JSON.parse(packet));

    const sortedPackets = packets.sort((a, b) => compareValues(b, a));

    let result = 1;
    for (let i = 0; i < sortedPackets.length; i++) {
        let packet = JSON.stringify(sortedPackets[i]);
        if (packet === '[[2]]' || packet === '[[6]]') {
            result *= i + 1;
        }
    }
    return result;
};
export { part1, part2 };
