import { partone as d1p1, parttwo as d1p2 } from "./01/code";
import { partone as d2p1, parttwo as d2p2 } from "./02/code";

const now_ts = Date.now();

console.log(`-- Day 1 --`);
console.log(`Part 1: ${d1p1}`);
console.log(`Part 2: ${d1p2}`);

console.log(``);

console.log(`-- Day 2 --`);
console.log(`Part 1: ${d2p1}`);
console.log(`Part 2: ${d2p2}`);

console.log(``);

console.log(`Execution time: ${Date.now() - now_ts}ms`);
