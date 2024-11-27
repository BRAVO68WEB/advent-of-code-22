const input = await Bun.file(`${import.meta.dir}/../../../input/13.txt`).text();

const compare = (left: any, right: any): number => {
  // If both are numbers, compare directly
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }
  
  // Convert to arrays if needed
  const leftArr = Array.isArray(left) ? left : [left];
  const rightArr = Array.isArray(right) ? right : [right];
  
  // Compare arrays element by element
  for (let i = 0; i < Math.min(leftArr.length, rightArr.length); i++) {
    const result = compare(leftArr[i], rightArr[i]);
    if (result !== 0) return result;
  }
  
  // If we get here, compare lengths
  return leftArr.length - rightArr.length;
};

const sp1 = (input: string) => {
  const pairs = input.trim().split('\n\n');
  let sum = 0;
  
  pairs.forEach((pair, index) => {
    const [left, right] = pair.split('\n').map(line => JSON.parse(line));
    if (compare(left, right) < 0) {
      sum += index + 1;
    }
  });
  
  return sum;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
  const dividerPackets = [[[2]], [[6]]];
  const packets = input
    .trim()
    .split('\n')
    .filter(line => line !== '')
    .map(line => JSON.parse(line))
    .concat(dividerPackets)
    .sort((a, b) => compare(a, b));

  const firstDividerIndex = packets.findIndex(p => 
    JSON.stringify(p) === JSON.stringify([[2]])) + 1;
  const secondDividerIndex = packets.findIndex(p => 
    JSON.stringify(p) === JSON.stringify([[6]])) + 1;

  return firstDividerIndex * secondDividerIndex;
};


export const parttwo = sp2(input);