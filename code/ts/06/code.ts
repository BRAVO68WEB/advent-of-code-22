const input = await Bun.file(`${import.meta.dir}/../../../input/6.txt`).text();

// proc firstMarker(input: string, size: int): int =
//   for i in 0..<(input.len - size):
//     let chunk = input[i..<(i+size)].map(x => (int)x)
//     if chunk.toPackedSet.len == size:
//       return i + size

const firstMarker = (input: string, size: number) => {
    for (let i = 0; i < input.length - size; i++) {
        const chunk = input
            .slice(i, i + size)
            .split("")
            .map(x => x.charCodeAt(0));
        if (new Set(chunk).size === size) {
            return i + size;
        }
    }
};

export const partone = firstMarker(input, 4);

export const parttwo = firstMarker(input, 14);
