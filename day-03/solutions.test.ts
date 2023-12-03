import fs from 'fs';
import { collision, extractGear, extractPartNumbers, getSurroundings, isSymbolAdjacentToPartNumber, summarize } from './src';
import { describe, expect, test } from "vitest";
const input = fs.readFileSync('./src/input.txt', 'utf-8')
const testInputs =
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const noPartNumber = [114, 58]
const testInputSum = 4361
const testGearRatio = [16345, 467835]

describe("methods", () => {
    test("extract part numbers", () => {
        const result = extractPartNumbers([testInputs.split('\n')[0]])
        expect(result).toEqual([{
            contents: 467,
            x: 0,
            y: 0,
            boudingBox: {
                maxX: 3,
                maxY: 0,
                minX: 0,
                minY: 0,
            }
        }, {
            contents: 114,
            x: 5,
            y: 0,
            boudingBox: {
                maxX: 8,
                maxY: 0,
                minX: 5,
                minY: 0,

            }
        }])
    })

    test("has part number adjacent symbol", () => {
        const result = isSymbolAdjacentToPartNumber({
            contents: 467,
            x: 0,
            y: 0,
            boudingBox: {
                maxX: 3,
                maxY: 1,
                minX: 0,
                minY: 0,
            }
        }, testInputs.split('\n'))
        expect(result).toBe(true)
    })

    test("extract gear", () => {
        const result = extractGear(testInputs.split('\n'))
        expect(result[0]).toStrictEqual({
            contents: "*",
            x: 3,
            y: 1,
            boudingBox: {
                maxX: 4,
                maxY: 1,
                minX: 3,
                minY: 1,
            }
        })

    })

    test("has no part number adjacent symbol", () => {
        const result = isSymbolAdjacentToPartNumber({
            contents: 114,
            x: 5,
            y: 0,
            boudingBox: {
                maxX: 8,
                maxY: 1,
                minX: 5,
                minY: 0,
            }
        }, testInputs.split('\n'))
        expect(result).toBe(false)
    })

    test("summarize part numbers", () => {
        const testData = [1, 2, 3]
        const result = testData.reduce(summarize, 0)
        expect(result).toBe(6)
    })
    test('collision detection', () => {
        const part = [{
            contents: 467,
            x: 0,
            y: 0,
            boudingBox: {
                maxX: 3,
                maxY: 1,
                minX: 0,
                minY: 0,
            },
        }, {
            contents: 35,
            x: 3,
            y: 2,
            boudingBox: {
                maxX: 6,
                maxY: 1,
                minX: 2,
                minY: 1,
            },
        }];
        const gear = {
            contents: "*",
            x: 3,
            y: 1,
            boudingBox: {
                maxX: 4,
                maxY: 1,
                minX: 3,
                minY: 1,
            }
        }

        expect(collision(part[0], gear)).toBeTruthy()
        expect(collision(part[1], gear)).toBeTruthy()
    })
})

describe("solutions", () => {
    test("should solve example task", () => {
        const parts = extractPartNumbers(testInputs.split('\n'))
        const partNumbers = parts.map(partNumber => {
            if (isSymbolAdjacentToPartNumber(partNumber, testInputs.split('\n'))) {
                return partNumber
            }
        })
            .filter(Boolean)
            .map(partNumber => partNumber?.contents)

        const result = partNumbers.reduce(summarize, 0)
        expect(partNumbers).not.toContain(noPartNumber[0])
        expect(partNumbers).not.toContain(noPartNumber[1])
        expect(partNumbers).toContain(467)

        expect(result).toBe(testInputSum)

    })

    test("should solve first task", () => {
        const parts = extractPartNumbers(input.split('\n'))
        const partNumbers = parts.map(partNumber => {
            if (isSymbolAdjacentToPartNumber(partNumber, input.split('\n'))) {
                return partNumber
            }
        })
            .filter(Boolean)
            .map(partNumber => partNumber?.contents)

        const result = partNumbers.reduce(summarize, 0)
        expect(result).toBe(556057)
    })

    test("should solve second example task", () => {
        const parts = extractPartNumbers(testInputs.split('\n'))
        const gears = extractGear(testInputs.split('\n'))
        const foundGears = []
        gears.map((gear, index) => {
            const relevantParts = parts.filter(part => [gear.y, gear.y + 1, gear.y - 1].includes(part.y))

            relevantParts.map(part => {
                if (collision(part, gear)) {
                    if (part.contents === 664) {
                        console.log(part, gear, collision(part, gear));
                    }
                    if (!foundGears[index]) {
                        foundGears[index] = [part.contents]
                    } else {
                        foundGears[index].push(part.contents)
                    }

                }
            })
        })

        expect(foundGears).toStrictEqual([[467, 35], [617], [755, 598]])
        const result = foundGears.filter(gear => gear.length === 2).reduce((acc, curr) => acc + (curr[0] * curr[1]), 0)

        expect(result).toStrictEqual(467835)
    })
    test("should solve second task", () => {
        const parts = extractPartNumbers(input.split('\n'))
        const gears = extractGear(input.split('\n'))
        const foundGears = []
        gears.map((gear, index) => {
            const relevantParts = parts.filter(part => [gear.y, gear.y + 1, gear.y - 1].includes(part.y))

            relevantParts.map(part => {
                if (collision(part, gear)) {
                    if (!foundGears[index]) {
                        foundGears[index] = [part.contents]
                    } else {
                        foundGears[index].push(part.contents)
                    }

                }
            })
        })

        const result = foundGears
            .filter(gear => gear.length === 2)
            .reduce((acc, curr) => acc + (curr[0] * curr[1]), 0)

        expect(result).toBe(82824352)
    })
})