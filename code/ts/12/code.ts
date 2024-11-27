const input = await Bun.file(`${import.meta.dir}/../../../input/12.txt`).text();

const sp1 = (input: string) => {
  const grid = input.split('\n').map(line => line.split(''));
  const { start, end } = findStartAndEnd(grid);
  grid[start[0]][start[1]] = 'a';
  grid[end[0]][end[1]] = 'z';
  return bfs(grid, start, end);
};

const findStartAndEnd = (grid: string[][]) => {
  let start: [number, number] = [0, 0];
  let end: [number, number] = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'S') start = [i, j];
      if (grid[i][j] === 'E') end = [i, j];
    }
  }
  return { start, end };
};

const bfs = (grid: string[][], start: [number, number], end: [number, number]) => {
  const queue: [number, number, number][] = [[start[0], start[1], 0]];
  const visited = new Set<string>();
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length > 0) {
    const [row, col, steps] = queue.shift()!;
    if (row === end[0] && col === end[1]) {
      return steps;
    }
    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        const currentHeight = grid[row][col].charCodeAt(0);
        const newHeight = grid[newRow][newCol].charCodeAt(0);
        if (newHeight <= currentHeight + 1) {
          queue.push([newRow, newCol, steps + 1]);
        }
      }
    }
  }
  return -1;
};

export const partone = sp1(input);

const findShortestPath = (start: [number, number], end: [number, number], grid: string[][], directions: number[][]) => {
  const queue: [number, number, number][] = [[start[0], start[1], 0]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [row, col, steps] = queue.shift()!;

    if (row === end[0] && col === end[1]) {
      return steps;
    }

    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        const currentHeight = grid[row][col].charCodeAt(0);
        const newHeight = grid[newRow][newCol].charCodeAt(0);

        if (newHeight <= currentHeight + 1) {
          queue.push([newRow, newCol, steps + 1]);
        }
      }
    }
  }

  return Infinity;
};

const sp2 = (input: string) => {
  const grid = input.split('\n').map(line => line.split(''));
  let end: [number, number] = [0, 0];
  let startPoints: [number, number][] = [];
  
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === 'S' || grid[i][j] === 'a') {
              startPoints.push([i, j]);
              if (grid[i][j] === 'S') grid[i][j] = 'a';
          }
          if (grid[i][j] === 'E') {
              end = [i, j];
              grid[i][j] = 'z';
          }
      }
  }
  
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const allPaths = startPoints.map(start => findShortestPath(start, end, grid, directions));
  
  return Math.min(...allPaths.filter(steps => steps !== Infinity));
};

export const parttwo = sp2(input);
