const input = await Bun.file(`${import.meta.dir}/../../../input/5.txt`).text();

const sp1 = (input: string) => {
    const [stackInput, movesInput] = input.split("\n\n");

    // Parse initial stacks
    const stackLines = stackInput.split("\n");
    const numStacks = Math.ceil(stackLines[0].length / 4);
    const stacks: string[][] = Array(numStacks)
        .fill(0)
        .map(() => []);

    // Build stacks from bottom to top, excluding numbers line
    for (let i = stackLines.length - 2; i >= 0; i--) {
        for (let j = 0; j < numStacks; j++) {
            const crate = stackLines[i][j * 4 + 1];
            if (crate !== " ") {
                stacks[j].push(crate);
            }
        }
    }

    // Process moves
    const moves = movesInput.trim().split("\n");
    for (const move of moves) {
        const [count, from, to] = move.match(/\d+/g)!.map(Number);
        for (let i = 0; i < count; i++) {
            const crate = stacks[from - 1].pop();
            if (crate) stacks[to - 1].push(crate);
        }
    }

    // Get top crates
    return stacks.map(stack => stack[stack.length - 1]).join("");
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const [stackInput, movesInput] = input.split("\n\n");

    // Parse initial stacks
    const stackLines = stackInput.split("\n");
    const numStacks = Math.ceil(stackLines[0].length / 4);
    const stacks: string[][] = Array(numStacks)
        .fill(0)
        .map(() => []);

    // Build stacks from bottom to top, excluding numbers line
    for (let i = stackLines.length - 2; i >= 0; i--) {
        for (let j = 0; j < numStacks; j++) {
            const crate = stackLines[i][j * 4 + 1];
            if (crate !== " ") {
                stacks[j].push(crate);
            }
        }
    }

    // Process moves
    const moves = movesInput.trim().split("\n");
    for (const move of moves) {
        const [count, from, to] = move.match(/\d+/g)!.map(Number);
        const crates = stacks[from - 1].splice(-count);
        stacks[to - 1].push(...crates);
    }

    // Get top crates
    return stacks.map(stack => stack[stack.length - 1]).join("");
};

export const parttwo = sp2(input);
