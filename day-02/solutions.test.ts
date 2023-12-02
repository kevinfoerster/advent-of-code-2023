import fs from 'fs'
import { describe, expect, test } from "vitest";
import { extractColors, isWithinThreshold, extractGameId } from "./src/index";
const input = fs.readFileSync('./src/input.txt', 'utf-8')
const testInputs = [
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
]
// nly 12 red cubes, 13 green cubes, and 14 blue cubes
const cubeThresholds = {
    red: 12,
    green: 13,
    blue: 14
} as const
describe("methods", () => {
    test("should extract color amounts", () => {
        const testInput = testInputs[0].split('\n')
        expect(extractColors(testInput[0])).toStrictEqual({
            blue: [3, 6],
            red: [4, 1],
            green: [2, 2]
        })
    })
    test("is within threshold", () => {
        const testInput = {
            blue: [3, 6],
            red: [4, 1],
            green: [2, 2]
        }
        expect(isWithinThreshold(testInput, cubeThresholds)).toBe(true)
        expect(isWithinThreshold(testInput, { red: 1, blue: 20, green: 20 })).toBe(false)
    })
    test("should extract game id", () => {
        const testInput = testInputs[0].split('\n');
        expect(extractGameId(testInput[0])).toBe(1)
    })
})

describe("solutions", () => {
    test("should solve example task", () => {
        const lines = testInputs[0].split('\n')
        const validIdList = lines.map((line) => {
            const gameId = extractGameId(line)
            const colors = extractColors(line)
            if (isWithinThreshold(colors, cubeThresholds)) {
                console.log(`Game ${gameId} is within thresholds`)
                return gameId
            }
            return null

        })
        expect(validIdList.filter(Boolean).reduce((acc, curr) => acc + curr, 0)).toBe(8)        
    })
    
    test("should solve first task", () => {
        const lines = input.split('\n')
        const validIdList = lines.map((line) => {
            const gameId = extractGameId(line)
            const colors = extractColors(line)
            if (isWithinThreshold(colors, cubeThresholds)) {
                console.log(`Game ${gameId} is within thresholds`)
                return gameId
            }
            return null

        })
        expect(validIdList.filter(Boolean).reduce((acc, curr) => acc + curr, 0)).toBe(2447)        
    })
})