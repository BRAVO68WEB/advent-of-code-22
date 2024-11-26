const input = await Bun.file(`${import.meta.dir}/../../../input/11.txt`).text();

function getOperationFunction(input: string) {
  return function (old: string) {
    const string = input.replace(/old/, old);
    return eval(string);
  };
}

function getMonkeys() {
  const monkeys = input 
    .replace(/\r/g, "") 
    .trim() 
    .split("\n\n") 
    .map((lines, monkeyId) => {
      const items = lines
        .match(/Starting items(?:[:,] (\d+))+/g)?.[0]
        .split(": ")[1]
        .split(", ")
        .map(Number);
      const operation = lines.match(/= ([^\n]+)/)?.[1] ?? '';

      const divisibleBy = parseInt(lines.match(/divisible by (\d+)/)?.[1] ?? '');
      const whenTrueSendTo = parseInt(
        lines.match(/If true: throw to monkey (\d)/)?.[1] ?? '0'
      );
      const whenFalseSendTo = parseInt(
        lines.match(/If false: throw to monkey (\d)/)?.[1] ?? '0'
      );

      return {
        id: monkeyId,
        totalInspectedObjects: 0,
        items,
        divisibleBy,
        operation: getOperationFunction(operation),
        sendTo: (item: number) =>
          item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo,
      };
    });
  return monkeys;
}

const sp1 = (input: string) => {
  const monkeys = getMonkeys();
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items!;
      while (items.length) {
        let item = items.shift()!;
        monkey.totalInspectedObjects++;

        item = monkey.operation(item.toString());
        item = Math.floor(item / 3);
        const destination = monkey.sendTo(item);
        monkeys[destination]!.items!.push(item);
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  activity.sort((a, b) => b - a);
  return activity[0] * activity[1];
};

export const partone = sp1(input);

const sp2 = (input: string) => {
  const monkeys = getMonkeys();
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);
  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items!;
      while (items.length) {
        let item = items.shift()!;
        monkey.totalInspectedObjects++;

        item = monkey.operation(item.toString());
        item = item % divider;
        const destination = monkey.sendTo(item);

        monkeys[destination]!.items!.push(item);
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  activity.sort((a, b) => b - a);
  return activity[0] * activity[1];
};

export const parttwo = sp2(input);
