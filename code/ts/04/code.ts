const input = await Bun.file(`${import.meta.dir}/../../../input/4.txt`).text();

const sp1 = (input: string) => {
    const lines = input.split("\n");
    let sum = 0;
    for (const line of lines) {
        const [a, b] = line.split(",");
        const [a1, a2] = a.split("-").map(Number);
        const [b1, b2] = b.split("-").map(Number);
        if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) {
            sum++;
        }
    }
    return sum;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const lines = input.split("\n");
    let sum = 0;
    for (const line of lines) {
        const [a, b] = line.split(",");
        const [a1, a2] = a.split("-").map(Number);
        const [b1, b2] = b.split("-").map(Number);
        if (a2 >= b1 && b2 >= a1) {
            sum++;
        }
    }
    return sum;
};

export const parttwo = sp2(input);
