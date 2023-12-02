import fs from 'fs'

const input = fs.readFileSync('./src/input.txt', 'utf-8')
const digitsAsWords = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
]



const replaceWordsWithDigits = (line: string, reversed = false) => {
    let output = line
    let input = reversed ? line.split("").reverse().join("") : line
    // console.log(line);
    const regex = reversed ?
        new RegExp('[0-9]|' + digitsAsWords.map(
            word => word.split("").reverse().join("")
        ).join('|'), 'g') :
        new RegExp('[0-9]|' + digitsAsWords.join('|'), 'g')

    const result: Array<string> = []
    Array.from(input.matchAll(regex)).map(match => {
        if (Number.isInteger(Number(match[0]))) {
            result.push(String(match[0]));
        } else {

            result.push(String(digitsAsWords.indexOf(match[0])));
        }
    })


    // console.log({ result });
    return result.join('')
}

const extractNumbers = (line: string) => {
    const regex = /\d/g
    const matches = Array.from(line.match(regex) ?? [])
    return Number(`${matches[0]}${matches[matches.length - 1]}`)
}

const extractNumbersIncludingWords = (line: string) => {
    const regex = /\d/g
    const matches = Array.from(replaceWordsWithDigits(line).match(regex) ?? [])
    const matchesReversed = Array.from(replaceWordsWithDigits(line, true).match(regex) ?? [])
    // console.log(line, matches, replaceWordsWithDigits(line), Number(`${matches[0]}${matches[matches.length - 1]}`));
    return Number(`${matches[0]}${matchesReversed[0]}`)
}

const summarize = (acc: number, curr: number) => acc + curr

export {
    summarize,
    extractNumbers,
    extractNumbersIncludingWords,
    replaceWordsWithDigits,
}