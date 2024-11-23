const input = await Bun.file(`${import.meta.dir}/../../../input/10.txt`).text();

const sp1 = (input: string) => {
    let x = 1;
    let cycle = 0;
    let signalSum = 0;
    
    const checkSignalStrength = () => {
        cycle++;
        if ((cycle - 20) % 40 === 0 && cycle <= 220) {
            signalSum += cycle * x;
        }
    };

    input.trim().split('\n').forEach(line => {
        const [instruction, value] = line.split(' ');
        
        if (instruction === 'noop') {
            checkSignalStrength();
        } else if (instruction === 'addx') {
            checkSignalStrength();
            checkSignalStrength();
            x += parseInt(value);
        }
    });

    return signalSum;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    let x = 1;
    let cycle = 0;
    const screen: string[] = Array(6).fill('').map(() => '');
    
    const drawPixel = () => {
        const row = Math.floor(cycle / 40);
        const col = cycle % 40;
        
        // Sprite position is X-1, X, X+1
        const pixel = (col >= x - 1 && col <= x + 1) ? '#' : '.';
        screen[row] += pixel;
        
        cycle++;
    };

    input.trim().split('\n').forEach(line => {
        const [instruction, value] = line.split(' ');
        
        if (instruction === 'noop') {
            drawPixel();
        } else if (instruction === 'addx') {
            drawPixel();
            drawPixel();
            x += parseInt(value);
        }
    });

    // Return the screen as a multiline string
    return '\n' + screen.join('\n');
};

export const parttwo = sp2(input);
