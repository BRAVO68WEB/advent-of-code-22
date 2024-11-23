const input = await Bun.file(`${import.meta.dir}/../../../input/8.txt`).text();

// First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

// The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

// 30373
// 25512
// 65332
// 33549
// 35390

// Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

// All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

//     The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
//     The top-middle 5 is visible from the top and right.
//     The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
//     The left-middle 5 is visible, but only from the right.
//     The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
//     The right-middle 3 is visible from the right.
//     In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

// With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

// Consider your map; how many trees are visible from outside the grid?

const sp1 = (input: string) => {
    // Parse input into 2D array of numbers
    const grid = input.trim().split('\n').map(line => 
        line.split('').map(Number)
    );
    
    const height = grid.length;
    const width = grid[0].length;
    const visible = new Set<string>();
    
    // Check visibility from left and right
    for (let y = 0; y < height; y++) {
        let maxLeft = -1;
        let maxRight = -1;
        
        // Left to right
        for (let x = 0; x < width; x++) {
            if (grid[y][x] > maxLeft) {
                visible.add(`${y},${x}`);
                maxLeft = grid[y][x];
            }
        }
        
        // Right to left
        for (let x = width - 1; x >= 0; x--) {
            if (grid[y][x] > maxRight) {
                visible.add(`${y},${x}`);
                maxRight = grid[y][x];
            }
        }
    }
    
    // Check visibility from top and bottom
    for (let x = 0; x < width; x++) {
        let maxTop = -1;
        let maxBottom = -1;
        
        // Top to bottom
        for (let y = 0; y < height; y++) {
            if (grid[y][x] > maxTop) {
                visible.add(`${y},${x}`);
                maxTop = grid[y][x];
            }
        }
        
        // Bottom to top
        for (let y = height - 1; y >= 0; y--) {
            if (grid[y][x] > maxBottom) {
                visible.add(`${y},${x}`);
                maxBottom = grid[y][x];
            }
        }
    }
    
    return visible.size;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => 
        line.split('').map(Number)
    );
    
    const height = grid.length;
    const width = grid[0].length;
    let maxScore = 0;
    
    const getViewingDistance = (y: number, x: number, dy: number, dx: number) => {
        const treeHeight = grid[y][x];
        let distance = 0;
        y += dy;
        x += dx;
        
        while (y >= 0 && y < height && x >= 0 && x < width) {
            distance++;
            if (grid[y][x] >= treeHeight) break;
            y += dy;
            x += dx;
        }
        
        return distance;
    };
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const up = getViewingDistance(y, x, -1, 0);
            const down = getViewingDistance(y, x, 1, 0);
            const left = getViewingDistance(y, x, 0, -1);
            const right = getViewingDistance(y, x, 0, 1);
            
            const scenicScore = up * down * left * right;
            maxScore = Math.max(maxScore, scenicScore);
        }
    }
    
    return maxScore;
};

export const parttwo = sp2(input);
