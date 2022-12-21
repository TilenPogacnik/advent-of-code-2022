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

export { sumArrays, binarySearch };
