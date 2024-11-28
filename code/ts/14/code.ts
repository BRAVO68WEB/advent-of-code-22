const input = await Bun.file(`${import.meta.dir}/../../../input/14.txt`).text();

const sp1 = (input: string) => {
  // Parse input into rock coordinates
  const rocks = input.split('\n').map(line => 
    line.split(' -> ').map(coord => {
      const [x, y] = coord.split(',').map(Number);
      return { x, y };
    })
  );

  // Find boundaries
  let maxY = 0;
  const cave = new Set<string>();

  // Build rock structures
  rocks.forEach(path => {
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      maxY = Math.max(maxY, start.y, end.y);

      // Draw horizontal line
      if (start.y === end.y) {
        const [minX, maxX] = [Math.min(start.x, end.x), Math.max(start.x, end.x)];
        for (let x = minX; x <= maxX; x++) {
          cave.add(`${x},${start.y}`);
        }
      }
      // Draw vertical line
      else {
        const [minY, maxY] = [Math.min(start.y, end.y), Math.max(start.y, end.y)];
        for (let y = minY; y <= maxY; y++) {
          cave.add(`${start.x},${y}`);
        }
      }
    }
  });

  let sandCount = 0;
  while (true) {
    let sandX = 500;
    let sandY = 0;
    
    while (true) {
      // Check if sand is falling into abyss
      if (sandY > maxY) {
        return sandCount;
      }
      
      // Try moving down
      if (!cave.has(`${sandX},${sandY + 1}`)) {
        sandY++;
        continue;
      }
      // Try moving down-left
      if (!cave.has(`${sandX - 1},${sandY + 1}`)) {
        sandX--;
        sandY++;
        continue;
      }
      // Try moving down-right
      if (!cave.has(`${sandX + 1},${sandY + 1}`)) {
        sandX++;
        sandY++;
        continue;
      }
      
      // Sand comes to rest
      cave.add(`${sandX},${sandY}`);
      sandCount++;
      break;
    }
  }
};

export const partone = sp1(input);

const sp2 = (input: string) => {
  const rocks = input.split('\n').map(line => 
    line.split(' -> ').map(coord => {
      const [x, y] = coord.split(',').map(Number);
      return { x, y };
    })
  );

  let maxY = 0;
  const cave = new Set<string>();

  rocks.forEach(path => {
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      maxY = Math.max(maxY, start.y, end.y);

      if (start.y === end.y) {
        const [minX, maxX] = [Math.min(start.x, end.x), Math.max(start.x, end.x)];
        for (let x = minX; x <= maxX; x++) {
          cave.add(`${x},${start.y}`);
        }
      } else {
        const [minY, maxY] = [Math.min(start.y, end.y), Math.max(start.y, end.y)];
        for (let y = minY; y <= maxY; y++) {
          cave.add(`${start.x},${y}`);
        }
      }
    }
  });

  const floorY = maxY + 2;
  let sandCount = 0;

  while (true) {
    let sandX = 500;
    let sandY = 0;

    // If source is blocked, we're done
    if (cave.has('500,0')) {
      return sandCount;
    }
    
    while (true) {
      // Check if we hit the floor
      if (sandY + 1 === floorY) {
        cave.add(`${sandX},${sandY}`);
        sandCount++;
        break;
      }
      
      // Try moving down
      if (!cave.has(`${sandX},${sandY + 1}`)) {
        sandY++;
        continue;
      }
      // Try moving down-left
      if (!cave.has(`${sandX - 1},${sandY + 1}`)) {
        sandX--;
        sandY++;
        continue;
      }
      // Try moving down-right
      if (!cave.has(`${sandX + 1},${sandY + 1}`)) {
        sandX++;
        sandY++;
        continue;
      }
      
      // Sand comes to rest
      cave.add(`${sandX},${sandY}`);
      sandCount++;
      break;
    }
  }
};

export const parttwo = sp2(input);