const input = await Bun.file(`${import.meta.dir}/../../../input/16.txt`).text();

type Valve = { name: string, rate: number, children: string[] };

const valves: {[name: string]: Valve } = {};
const distances: { [start: string]: { [end: string]: number } } = {};

const getNextValve = (valveId: string) => {
  const next = valves[valveId].children;
  return next;
}

const findShortestDistance = (start: string, end: string) => {
  const queue = [{ position: start, distance: 0 }];
  const seen = new Set<string>();

  while (queue.length > 0) {
    const { position, distance } = queue.shift()!;
    if (position === end) {
      return distance;
    }

    for (const nextPosition of getNextValve(position)) {
      if (seen.has(nextPosition)) {
        continue; 
      }
      seen.add(nextPosition);

      queue.push({ position: nextPosition, distance: distance + 1 });
    }
  }

  return -1;
}

const makeDecision = (valve: Valve, decisions: string, timeLeft: number): number => {
  if (timeLeft <= 0) {
    return 0;
  }

  let totalRate = (valve.rate * timeLeft);

  const possibleDecisions = [];
  const childrenIds = Object.keys(distances[valve.name]);
  for (const element of childrenIds) {
    const childId = element;
    const nextDecision = childId;
    if (decisions.includes(nextDecision)) {
      continue;
    }

    if (timeLeft - distances[valve.name][childId] < 0) {
      continue;
    }

    possibleDecisions.push({ valve: valves[childId], nextDecision, timeConsumed: distances[valve.name][childId] });
  }

  if (possibleDecisions.length > 0) {
    totalRate += Math.max(...possibleDecisions.map(dec => makeDecision(dec.valve, decisions + ',' + dec.nextDecision, timeLeft - dec.timeConsumed)));
  }

  return totalRate;
}

const sp1 = (input: string) => {
  const data: string[] = input.split('\n');

  data.forEach(rawValve => {
    const [,name,,,rawRate,,,,,...children] = rawValve.replaceAll(',', '').split(' ');
    const rate = +rawRate.split('=')[1].split(';')[0];
    valves[name] =  { name, rate, children };
  });

  const valveArray = Object.values(valves);
  for (let i = 0; i < valveArray.length; i++) {
    const valveA = valveArray[i];
    for (let j = 0; j < valveArray.length; j++) {
      if (i === j) {
        continue;
      }

      const valveB = valveArray[j];

      if (valveA.rate === 0 || valveB.rate === 0) {
        if (valveA.name === 'AA') {
          if (valveB.rate === 0) {
            continue;
          }
        } else {
          continue;
        }
      }

      if (!distances[valveA.name]) {
        distances[valveA.name] = {};
      }

      distances[valveA.name][valveB.name] = findShortestDistance(valveA.name, valveB.name) + 1; // +1 is activation cost
    }
  }

  return makeDecision(valves['AA'], 'AA', 30);
};

export const partone = sp1(input);

const sp2 = (input: string) => {
  return 0;
}

export const parttwo = sp2(input);