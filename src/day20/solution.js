//Advent of code 2022
//Day 20: Grove Positioning System

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const mixed = mix(input, 1);
    return getResult(mixed, [1000, 2000, 3000]);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    input.forEach((num) => (num.val *= 811589153));
    const mixed = mix(input, 10);
    return getResult(mixed, [1000, 2000, 3000]);
};

const parseInput = (rawInput) =>
    //Map input numbers to objects to make sure all elements are unique
    rawInput.split('\n').map((num) => {
        return { val: Number(num) };
    });

const mix = (original, mixCount) => {
    const mixed = [...original];
    for (let i = 0; i < mixCount; i++) {
        for (const number of original) {
            const index = mixed.indexOf(number);
            const newIndex = (index + number.val) % (mixed.length - 1);
            mixed.splice(index, 1);
            mixed.splice(newIndex, 0, number);
        }
    }
    return mixed;
};

const getResult = (array, coords) => {
    const zeroIndex = array.findIndex((num) => num.val === 0);
    return coords.reduce((sum, c) => sum + array[(c + zeroIndex) % array.length].val, 0);
};

export { part1, part2 };
