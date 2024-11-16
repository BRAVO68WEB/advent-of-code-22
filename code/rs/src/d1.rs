#![allow(
    clippy::must_use_candidate,
    clippy::missing_panics_doc,
    clippy::cast_lossless
)]

use itertools::Itertools;

pub fn common(input: &str) -> Vec<usize> {
    input
        .split("\n\n")
        .map(|s| {
            s.lines()
                .map(|l| l.parse::<usize>().unwrap())
                .sum::<usize>()
        })
        .sorted()
        .rev()
        .collect::<Vec<_>>()
}

pub fn part1(input: &str) -> u32 {
    let xs = common(input);
    let p1 = xs[0];
    p1.try_into().unwrap()
}

pub fn part2(input: &str) -> u32 {
    let xs = common(input);
    let p2: usize = xs[0..3].iter().sum();
    p2.try_into().unwrap()
}

pub fn main() {
    let input = std::fs::read_to_string("../../input/1.txt").expect("Input file not found");
    println!("Part 1 : {}", part1(&input));
    println!("Part 2 : {}", part2(&input));
}
