const input = await Bun.file(`${import.meta.dir}/../../../input/3.txt`).text();

const sp1 = (input: string) => {
    const rucksacks = input.split("\n");
    let sum = 0;
    for (const rucksack of rucksacks) {
        const [comp1, comp2] = [
            rucksack.slice(0, rucksack.length / 2),
            rucksack.slice(rucksack.length / 2),
        ];
        for (const item of comp1) {
            if (comp2.includes(item)) {
                sum += item.charCodeAt(0) - (item === item.toLowerCase() ? 96 : 38);
                break;
            }
        }
    }
    return sum;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const lines = input.split("\n");
    const groups = [];
    for (let i = 0; i < lines.length; i += 3) {
        groups.push(lines.slice(i, i + 3));
    }

    let sum = 0;
    for (const group of groups) {
        const rucksacks = group.map(r => r.split(""));
        const badges = rucksacks[0].filter(
            item => rucksacks[1].flat().includes(item) && rucksacks[2].flat().includes(item),
        );
        sum += badges[0].charCodeAt(0) - (badges[0] === badges[0].toLowerCase() ? 96 : 38);
    }

    return sum;
};

export const parttwo = sp2(input);
