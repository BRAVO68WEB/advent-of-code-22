const input = await Bun.file(`${import.meta.dir}/../../../input/1.txt`).text();

const sp1 = (input: string) => {
    const lines = input.split("\n");
    let max = 0;
    let sum = 0;
    for (const element of lines) {
        if (element === "") {
            if (sum > max) {
                max = sum;
            }
            sum = 0;
        } else {
            sum += parseInt(element);
        }
    }

    return max;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const lines = input.split("\n");
    let max = 0;
    let sum = 0;
    const top3 = [];
    for (const element of lines) {
        if (element === "") {
            if (sum > max) {
                top3.push(sum);
                top3.sort((a, b) => b - a);
                if (top3.length > 3) {
                    top3.pop();
                }
                max = top3[0];
            }
            sum = 0;
        } else {
            sum += parseInt(element);
        }
    }

    return top3.reduce((a, b) => a + b, 0);
};

export const parttwo = sp2(input);
