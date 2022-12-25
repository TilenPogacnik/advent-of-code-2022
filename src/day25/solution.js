//Advent of code 2022
//Day 25: Full of Hot Air

const part1 = (rawInput) => {
    const numbers = parseInput(rawInput).map((elfNumber) => elf2dec(elfNumber));
    const sum = numbers.reduce((sum, num) => sum + num, 0);
    return dec2elf(sum);
};

const dec2elf = (num) => {
    let elf = '';

    while (num > 0) {
        if (num % 5 === 4) {
            elf = '-' + elf;
            num += 1;
        } else if (num % 5 == 3) {
            elf = '=' + elf;
            num += 2;
        } else {
            elf = (num % 5) + elf;
        }

        num = Math.floor(num / 5);
    }
    return elf;
};

const elf2dec = (elf) => {
    const elfNum = elf
        .split('')
        .map((el) => {
            if (el === '-') el = -1;
            if (el === '=') el = -2;
            return Number(el);
        })
        .reverse();

    let dec = 0;
    for (let i = 0; i < elfNum.length; i++) {
        dec += elfNum[i] * Math.pow(5, i);
    }

    return dec;
};

const parseInput = (rawInput) => rawInput.split('\n');
export { part1 };
