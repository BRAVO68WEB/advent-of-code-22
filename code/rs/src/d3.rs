#![allow(
    clippy::must_use_candidate,
    clippy::missing_panics_doc,
    clippy::cast_lossless,
    clippy::identity_op
)]

pub fn part1(input: &str) -> u32 {
    let mut sum = 0;
    for rucksack in input.lines() {
        let (comp1, comp2) = rucksack.split_at(rucksack.len() / 2);
        for item in comp1.chars() {
            if comp2.contains(item) {
                sum += item as u32 - if item.is_lowercase() { 96 } else { 38 };
                break;
            }
        }
    }
    sum
}

pub fn part2(input: &str) -> u32 {
    let mut sum = 0;
    for group in input.lines().collect::<Vec<_>>().chunks(3) {
        let rucksacks = group.iter().map(|r| r.chars()).collect::<Vec<_>>();
        let badges = rucksacks[0]
            .clone()
            .filter(|item| {
                rucksacks[1].clone().any(|i| i == *item) && rucksacks[2].clone().any(|i| i == *item)
            })
            .collect::<Vec<_>>();
        sum += badges[0] as u32 - if badges[0].is_lowercase() { 96 } else { 38 };
    }
    sum
}

pub fn main() {
    let input = std::fs::read_to_string("../../input/3.txt").expect("Input file not found");
    println!("Part 1 : {}", part1(&input));
    println!("Part 2 : {}", part2(&input));
}
