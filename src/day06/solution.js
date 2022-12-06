const part1 = (rawInput) => {
    return findFirstValidMarker(rawInput, 4);
};

const part2 = (rawInput) => {
    return findFirstValidMarker(rawInput, 14);
};
  
const findFirstValidMarker = (datastream, markerLength) => {
    for (let i = markerLength; i < datastream.length; i++){
        const marker = datastream.substring(i - markerLength, i);
        if (isValidMarker(marker)) return i;
    }
    return -1;
}

const isValidMarker = (marker) => {
    return new Set(marker).size === marker.length;
}

export {part1, part2};