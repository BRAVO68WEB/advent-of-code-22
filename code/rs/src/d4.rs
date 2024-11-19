#![allow(
    clippy::must_use_candidate,
    clippy::missing_panics_doc,
    clippy::cast_lossless,
    clippy::identity_op
)]

fn range_contains_range(range: (u32, u32), other: (u32, u32)) -> bool {
    range.0 <= other.0 && range.1 >= other.1
}

pub fn part1(input: &str) -> u32 {
    let lines = input.lines();
    let mut score = 0;
    for line in lines {
        let line = line;

        let (one, two) = line.split_once(',').unwrap();
        let (a, b) = one.split_once('-').unwrap();
        let (c, d) = two.split_once('-').unwrap();

        let a = a.parse::<u32>().unwrap();
        let b = b.parse::<u32>().unwrap();
        let c = c.parse::<u32>().unwrap();
        let d = d.parse::<u32>().unwrap();

        let range1 = (a, b);
        let range2 = (c, d);

        if range_contains_range(range1, range2) || range_contains_range(range2, range1) {
            score += 1;
        }
    }
    score
}

fn range_overlaps_range(range: (u32, u32), other: (u32, u32)) -> bool {
    range.0 <= other.0 && other.0 <= range.1
        || range.0 <= other.1 && other.1 <= range.1
        || other.0 <= range.0 && range.0 <= other.1
        || other.0 <= range.1 && range.1 <= other.1
}

pub fn part2(input: &str) -> u32 {
    let lines = input.lines();
    let mut score = 0;
    for line in lines {
        let line = line;

        let (one, two) = line.split_once(',').unwrap();
        let (a, b) = one.split_once('-').unwrap();
        let (c, d) = two.split_once('-').unwrap();

        let a = a.parse::<u32>().unwrap();
        let b = b.parse::<u32>().unwrap();
        let c = c.parse::<u32>().unwrap();
        let d = d.parse::<u32>().unwrap();

        let range1 = (a, b);
        let range2 = (c, d);

        if range_overlaps_range(range1, range2) {
            score += 1;
        }
    }
    score
}

pub fn main() {
    let input = std::fs::read_to_string("../../input/4.txt").expect("Input file not found");
    println!("Part 1 : {}", part1(&input));
    println!("Part 2 : {}", part2(&input));
}
