//Advent of code 2022
//Day 7: No Space Left On Device

const part1 = (rawInput) => {
    const rootDir = generateDirectories(rawInput);
    const dirList = flattenDir(rootDir);

    const sizeLimit = 100000;

    return dirList
        .filter((dir) => dir.getSize() < sizeLimit)
        .reduce((sum, dir) => sum + dir.getSize(), 0);
};

const part2 = (rawInput) => {
    const rootDir = generateDirectories(rawInput);
    const dirList = flattenDir(rootDir);

    const maxAllowedSpace = 40000000;
    const neededExtraSpace = rootDir.getSize() - maxAllowedSpace;

    const deletionCandidates = dirList
        .map((dir) => dir.getSize())
        .filter((size) => size > neededExtraSpace);
    return Math.min(...deletionCandidates);
};

const generateDirectories = (rawInput) => {
    const commands = parseCommands(rawInput);

    const rootDir = new Dir('/', null);
    let currentDir = rootDir;

    for (const command of commands) {
        switch (command[0].substring(0, 2)) {
            case 'ls':
                const listResults = command.slice(1);
                currentDir.addListResults(listResults);
                break;

            case 'cd':
                currentDir = currentDir.changeDir(command[0].substring(3));
                break;
            default:
                console.log('Unknown command: ' + command.join(' '));
        }
    }

    return rootDir;
};

const parseCommands = (rawInput) =>
    rawInput
        .split('\n$ ')
        .map((el) => el.split('\n'))
        .slice(1);

const flattenDir = (dir) => {
    const dirs = [dir];
    dir.children.forEach((child) => {
        dirs.push(...flattenDir(child));
    });

    return dirs;
};

class Dir {
    files = [];
    children = [];

    constructor(name, parentDir) {
        this.name = name;
        this.parentDir = parentDir;
    }

    getSize() {
        const fileSize = this.files.reduce((sum, file) => (sum += Number(file[0])), 0);
        const childDirSize = this.children.reduce((sum, child) => (sum += child.getSize()), 0);
        return fileSize + childDirSize;
    }

    changeDir(targetDir) {
        return targetDir === '..'
            ? this.parentDir
            : this.children.find((child) => child.name === targetDir);
    }

    addListResults(results) {
        for (const result of results) {
            const item = result.split(' ');
            if (item[0] === 'dir') {
                this.children.push(new Dir(item[1], this));
            } else {
                this.files.push(item);
            }
        }
    }
}

export { part1, part2 };
