const sumArrays = (...arrays) => {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map((xs) => xs[i] || 0).reduce((sum, x) => sum + x, 0));
};

const binarySearch = (range, target, testFunction) => {
    let [left, right] = range;
    const mul = testFunction(right) > testFunction(left) ? 1 : -1;

    while (left <= right) {
        const curr = Math.floor((left + right) / 2);
        const result = mul * testFunction(curr);

        if (result < target) {
            left = curr + 1;
        } else if (result > target) {
            right = curr - 1;
        } else {
            return curr;
        }
    }
    return -1;
};

const padNumericArray = (array, paddingValue, thickness) => {
    const sidePad = paddingValue.toString().repeat(thickness);
    const topPad = paddingValue.toString().repeat(array[0].length).split('');

    for (let i = 0; i < thickness; i++) {
        array.unshift(topPad);
        array.push(topPad);
    }

    array = array.map((a) => sidePad + a.join('') + sidePad);
    array = array.map((a) => a.split('').map((n) => +n));

    return array;
};

const lcm_two_numbers = (x, y) => {
    if (typeof x !== 'number' || typeof y !== 'number') return false;
    return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
};

const gcd_two_numbers = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        const t = y;
        y = x % y;
        x = t;
    }
    return x;
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

export { sumArrays, binarySearch, padNumericArray, lcm_two_numbers, gcd_two_numbers, mod };
