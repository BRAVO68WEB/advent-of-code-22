const input = await Bun.file(`${import.meta.dir}/../../../input/2.txt`).text();

type a = "A" | "B" | "C";
type b = "X" | "Y" | "Z";

const sp1 = (input: string) => {
    let totalScore = 0;
    const rounds = input.split("\n");
    const outcomeScore = { w: 6, d: 3, l: 0 };
    const pickScore = { X: 1, Y: 2, Z: 3 };

    const checkWin = (pickOneChar: a, pickTwoChar: b) => {
        let roundScore = 0;
        const pickOne = pickOneChar.charCodeAt(0);
        const pickTwo = pickTwoChar.charCodeAt(0) - 23;
        if (pickOne - pickTwo === 0) {
            roundScore = outcomeScore.d;
        } else if (pickOne - pickTwo === -1 || pickOne - pickTwo === 2) {
            roundScore = outcomeScore.w;
        }
        return roundScore + pickScore[pickTwoChar];
    };

    for (const round of rounds) {
        const [pickOne, pickTwo] = round.split(" ");
        totalScore += checkWin(pickOne as a, pickTwo as b);
    }

    return totalScore;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    let totalScore = 0;
    const rounds = input.split("\n");
    const pickScore: { [pick in a]: number } = { A: 1, B: 2, C: 3 };
    const outcomeScore: { [pick in b]: number } = { X: 0, Y: 3, Z: 6 };

    const checkWin = (pickOne: number, pickTwo: number) => {
        if (pickOne - pickTwo === -1 || pickOne - pickTwo === 2) {
            return true;
        } else {
            return false;
        }
    };

    const computeScore = (pickOneChar: a, winOrLose: b) => {
        let scoreForPick = 0;
        let whatToPlay: string;
        let didWin: boolean;
        const pickOne = pickOneChar.charCodeAt(0) - 65;

        if (winOrLose === "Y") {
            scoreForPick = pickScore[pickOneChar];
        } else {
            didWin = checkWin(pickOne, (pickOne + 1) % 3);
            whatToPlay =
                didWin && winOrLose === "Z"
                    ? String.fromCharCode(65 + ((pickOne + 1) % 3))
                    : String.fromCharCode(65 + ((pickOne + 2) % 3));
            scoreForPick = pickScore[whatToPlay as a];
        }
        return scoreForPick + outcomeScore[winOrLose];
    };

    for (const round of rounds) {
        const [pickOne, winOrLose] = round.split(" ");
        totalScore += computeScore(pickOne as a, winOrLose as b);
    }

    return totalScore;
};

export const parttwo = sp2(input);
