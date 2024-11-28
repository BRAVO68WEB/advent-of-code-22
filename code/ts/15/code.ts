const input = await Bun.file(`${import.meta.dir}/../../../input/15.txt`).text();

type Point = { x: number; y: number };
type Sensor = { pos: Point; beacon: Point; range: number };

const getManhattanDistance = (p1: Point, p2: Point) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};

const parseSensors = (input: string): Sensor[] => {
  return input.split('\n').map(line => {
    const matches = line.match(/x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/);
    if (!matches) throw new Error('Invalid input');
    
    const pos = { x: parseInt(matches[1]), y: parseInt(matches[2]) };
    const beacon = { x: parseInt(matches[3]), y: parseInt(matches[4]) };
    const range = getManhattanDistance(pos, beacon);
    
    return { pos, beacon, range };
  });
};

const sp1 = (input: string, targetY = 2000000) => {
  const sensors = parseSensors(input);
  const ranges = new Set<number>();
  const beaconsInRow = new Set<number>();
  
  // Track beacons in target row
  sensors.forEach(({ beacon }) => {
    if (beacon.y === targetY) {
      beaconsInRow.add(beacon.x);
    }
  });
  
  // Find covered ranges in target row
  sensors.forEach(({ pos, range }) => {
    const yDistance = Math.abs(targetY - pos.y);
    const remainingRange = range - yDistance;
    
    if (remainingRange >= 0) {
      // Add all x positions within range
      for (let x = pos.x - remainingRange; x <= pos.x + remainingRange; x++) {
        ranges.add(x);
      }
    }
  });
  
  // Subtract beacons in row from total covered positions
  return ranges.size - beaconsInRow.size;
};

export const partone = sp1(input);

const sp2 = (input: string, maxCoord = 4000000) => {
  const sensors = parseSensors(input);
  
  // Check each row
  for (let y = 0; y <= maxCoord; y++) {
    // Get covered ranges for this row
    const ranges: [number, number][] = [];
    
    for (const sensor of sensors) {
      const yDistance = Math.abs(y - sensor.pos.y);
      const remainingRange = sensor.range - yDistance;
      
      if (remainingRange >= 0) {
        const minX = Math.max(0, sensor.pos.x - remainingRange);
        const maxX = Math.min(maxCoord, sensor.pos.x + remainingRange);
        ranges.push([minX, maxX]);
      }
    }
    
    // Sort ranges by start position
    ranges.sort((a, b) => a[0] - b[0]);
    
    // Merge overlapping ranges
    let mergedEnd = ranges[0][1];
    
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i][0] > mergedEnd + 1) {
        // Gap found - this is our x coordinate
        return (mergedEnd + 1) * 4000000 + y;
      }
      mergedEnd = Math.max(mergedEnd, ranges[i][1]);
    }
  }
  
  return 0;
};

export const parttwo = sp2(input);