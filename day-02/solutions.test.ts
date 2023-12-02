import fs from 'fs'
import { describe, expect, test } from "vitest";
import { extractNumbers, extractNumbersIncludingWords, replaceWordsWithDigits, summarize } from "./src";
const input = fs.readFileSync('./src/input.txt', 'utf-8')
const testInputs = [
    `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
    `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
]


describe("methods", () => {
    test("should summarize array", () => {
        expect(summarize(5, 8)).toBe(13)
    })
    test("should extract numbers from string", () => {
        const testResults = [
            [12, 38, 15, 77],
            [11, NaN, 22, 33, 42, 24, 77]
        ]
        const firstExampleOutput = testInputs[0].split('\n')
        firstExampleOutput.forEach((line, index) => {
            expect(extractNumbers(line)).toBe(testResults[0][index])
        })


        const secondExampleOutput = testInputs[1].split('\n')
        secondExampleOutput.forEach((line, index) => {
            expect(extractNumbers(line)).toBe(testResults[1][index])
        })

    })
    test("should extract numbers and numbers as words from string", () => {
        const testResults = [
            [12, 38, 15, 77],
            [29, 83, 13, 24, 42, 14, 76]
        ]
        const firstExampleOutput = testInputs[0].split('\n')
        firstExampleOutput.forEach((line, index) => {
            expect(extractNumbersIncludingWords(line)).toBe(testResults[0][index])
        })


        const secondExampleOutput = testInputs[1].split('\n')
        secondExampleOutput.forEach((line, index) => {
            expect(extractNumbersIncludingWords(line)).toBe(testResults[1][index])
        })

    })
    test("should summarize", () => {
        const testResults = [
            [12, 38, 15, 77],
            [29, 83, 13, 24, 42, 14, 76]
        ]
        const firstExampleOutput = testInputs[0].split('\n')
        firstExampleOutput.forEach((line, index) => {
            expect(extractNumbersIncludingWords(line)).toBe(testResults[0][index])
            expect(testResults[0].reduce(summarize, 0)).toBe(142)
        })


        const secondExampleOutput = testInputs[1].split('\n')
        secondExampleOutput.forEach((line, index) => {
            expect(extractNumbersIncludingWords(line)).toBe(testResults[1][index])
            expect(testResults[1].reduce(summarize, 0)).toBe(281)
        })

    })
    test("should replace words with digits", () => {
        const testResults = [
            29,
            83,
            13,
            24,
            42,
            14,
            76
        ]
        expect(replaceWordsWithDigits('one')).toBe('1')
        expect(replaceWordsWithDigits('oneone')).toBe('11')
        expect(replaceWordsWithDigits('oneightone')).toBe('11')
        expect(replaceWordsWithDigits('two4five')).toBe('245')
        expect(replaceWordsWithDigits('jcb82eightwond')).toBe('828')

        const secondExampleOutput = testInputs[1].split('\n')
        secondExampleOutput.forEach((line, index) => {
            // console.log(extractNumbersIncludingWords(line));
            expect(extractNumbersIncludingWords(line)).toBe(testResults[index])
        })
    })


})
describe("solutions", () => {
    const lines = input.split('\n')
    test("should solve first task", () => {
        expect(lines.map(extractNumbers).filter(Boolean).reduce(summarize, 0)).toBe(53334)
    })
    test("should solve second task", () => {
        expect(lines.map(extractNumbersIncludingWords).filter(Boolean).reduce(summarize, 0)).toBe(55291)
    })
})