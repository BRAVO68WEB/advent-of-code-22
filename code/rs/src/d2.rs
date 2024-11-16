#![allow(
    clippy::must_use_candidate,
    clippy::missing_panics_doc,
    clippy::cast_lossless,
    clippy::identity_op
)]

fn score(rounds: &[(char, char)]) -> usize {
    rounds
        .iter()
        .map(|(a, b)| match (a, b) {
            ('A', 'Y') => 6 + 2,
            ('B', 'Z') => 6 + 3,
            ('C', 'X') => 6 + 1,
            ('A', 'X') => 3 + 1,
            ('B', 'Y') => 3 + 2,
            ('C', 'Z') => 3 + 3,
            ('A', 'Z') => 0 + 3,
            ('B', 'X') => 0 + 1,
            ('C', 'Y') => 0 + 2,
            _ => unreachable!(),
        })
        .sum()
}

pub fn rc(input: &str) -> Vec<(char, char)> {
    input
        .lines()
        .map(|l| (l.as_bytes()[0] as char, l.as_bytes()[2] as char))
        .collect::<Vec<_>>()
}

pub fn part1(input: &str) -> u32 {
    let r1 = rc(input);
    score(&r1).try_into().unwrap()
}

pub fn part2(input: &str) -> u32 {
    let r2 = rc(input)
        .iter()
        .copied()
        .map(|(a, b)| match (a, b) {
            // lose
            ('A', 'X') => ('A', 'Z'),
            ('B', 'X') => ('B', 'X'),
            ('C', 'X') => ('C', 'Y'),
            // draw
            ('A', 'Y') => ('A', 'X'),
            ('B', 'Y') => ('B', 'Y'),
            ('C', 'Y') => ('C', 'Z'),
            // win
            ('A', 'Z') => ('A', 'Y'),
            ('B', 'Z') => ('B', 'Z'),
            ('C', 'Z') => ('C', 'X'),
            _ => unreachable!(),
        })
        .collect::<Vec<_>>();
    score(&r2).try_into().unwrap()
}

pub fn main() {
    let input = std::fs::read_to_string("../../input/2.txt").expect("Input file not found");
    println!("Part 1 : {}", part1(&input));
    println!("Part 2 : {}", part2(&input));
}
