const input = await Bun.file(`${import.meta.dir}/../../../input/9.txt`).text();

type Position = { x: number; y: number };
type Direction = 'U' | 'D' | 'L' | 'R';

const sp1 = (input: string) => {
    const head: Position = { x: 0, y: 0 };
    const tail: Position = { x: 0, y: 0 };
    const visited = new Set<string>();
    visited.add('0,0');

    const moveHead = (direction: Direction) => {
        switch (direction) {
            case 'U': head.y++; break;
            case 'D': head.y--; break;
            case 'L': head.x--; break;
            case 'R': head.x++; break;
        }
    };

    const moveTail = () => {
        const dx = head.x - tail.x;
        const dy = head.y - tail.y;

        // If head and tail are touching, no need to move
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) return;

        // Move tail
        if (dx !== 0) tail.x += dx > 0 ? 1 : -1;
        if (dy !== 0) tail.y += dy > 0 ? 1 : -1;

        visited.add(`${tail.x},${tail.y}`);
    };

    input.trim().split('\n').forEach(line => {
        const [direction, steps] = line.split(' ');
        for (let i = 0; i < parseInt(steps); i++) {
            moveHead(direction as Direction);
            moveTail();
        }
    });

    return visited.size;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const ROPE_LENGTH = 10;
    const knots: Position[] = Array(ROPE_LENGTH).fill(null).map(() => ({ x: 0, y: 0 }));
    const visited = new Set<string>();
    visited.add('0,0');

    const moveKnot = (head: Position, tail: Position) => {
        const dx = head.x - tail.x;
        const dy = head.y - tail.y;

        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) return;

        if (dx !== 0) tail.x += dx > 0 ? 1 : -1;
        if (dy !== 0) tail.y += dy > 0 ? 1 : -1;
    };

    input.trim().split('\n').forEach(line => {
        const [direction, steps] = line.split(' ');
        
        for (let i = 0; i < parseInt(steps); i++) {
            // Move head
            switch (direction) {
                case 'U': knots[0].y++; break;
                case 'D': knots[0].y--; break;
                case 'L': knots[0].x--; break;
                case 'R': knots[0].x++; break;
            }

            // Move rest of the rope
            for (let j = 1; j < ROPE_LENGTH; j++) {
                moveKnot(knots[j-1], knots[j]);
            }

            // Record tail position
            const tail = knots[ROPE_LENGTH - 1];
            visited.add(`${tail.x},${tail.y}`);
        }
    });

    return visited.size;
};

export const parttwo = sp2(input);
