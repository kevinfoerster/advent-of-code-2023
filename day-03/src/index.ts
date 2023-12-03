type PartNumber = {
    contents: number | string,
    x: number,
    y: number,
    boudingBox: {
        minX: number,
        maxX: number,
        minY: number,
        maxY: number
    }
}
const extractPartNumbers = (input: string[]) => {
    const result: Array<PartNumber> = []
    const regex = /\d+/g
    input.forEach((line, y) => {
        const matches = line.matchAll(regex)
        Array.from(matches).map(match => {
            result.push({
                contents: parseInt(match[0]),
                x: match.index ?? 0,
                y,
                boudingBox: {
                    minX: match.index ?? 0,
                    maxX: (match.index ?? 0) + match[0].length,
                    minY: y - 1 < 0 ? 0 : y - 1,
                    maxY: y + 1 > input.length - 1 ? input.length - 1 : y + 1
                }
            })
        })
    })

    return result

}

const getSurrounding = (input: string, x: number, length: number) => {
    if (!input) {
        return undefined
    }
    const bounds = {
        maxX: input.length - 1,
        maxY: input[0].length - 1,
        minY: 0,
        minX: 0
    }
    return input?.split("")
        .slice(
            Math.max(x - 1, bounds.minX),
            Math.min(x + length + 1, bounds.maxX)
        ).join("")

}

const getSurroundings = (input: string[], y: number, x: number, length: number) => {
    return [
        getSurrounding(input[y - 1], x, length),
        getSurrounding(input[y], x, length),
        getSurrounding(input[y + 1], x, length),
    ]
}


const isSymbolAdjacentToPartNumber = (partNumber: PartNumber, input: string[]) => {
    const { x, y } = partNumber
    const length = String(partNumber.contents).length
    const partNumberSurroundings = getSurroundings(input, y, x, length)
    const result = partNumberSurroundings
        .filter(Boolean)
        .map(surrounding => {
            return (surrounding
                ?.replaceAll(/\d/g, "")
                .replaceAll(/\./g, "") ?? '')
                .length > 0

        })
    return result.some(Boolean)
}
const extractGear = (input: string[]) => {
    const result: Array<PartNumber> = []
    const regex = /\*/g
    input.forEach((line, y) => {
        const matches = line.matchAll(regex)
        Array.from(matches).map(match => {
            result.push({
                contents: "*",
                x: match.index ?? 0,
                y,
                boudingBox: {
                    minX: (match.index ?? 0) < 0 ? 0 : (match.index ?? 0),
                    maxX: (match.index ?? 0) + match[0].length,
                    minY: y < 0 ? 0 : y,
                    maxY: y > input.length ? input.length - 1 : y
                }
            })
        })
    })

    return result

}

const collision = (partNumber: PartNumber, gear: PartNumber) => {
    const { minX: p_minX, maxX: p_maxX, minY: p_minY, maxY: p_maxY } = partNumber.boudingBox
    const { minX: g_minX, maxX: g_maxX, minY: g_minY, maxY: g_maxY } = gear.boudingBox

    const xCollision = (p_minX <= g_maxX && p_maxX >= g_minX)
    const yCollision = (p_minY <= g_maxY && p_maxY >= g_minY)
    return xCollision && yCollision
}
// const isGearAdjacentToPartNumber = (partNumber: PartNumber, input: string[]) => {

//     const { x, y } = partNumber
//     const length = String(partNumber.partNumber).length
//     const partNumberSurroundings = [
//         getSurroundings(input[y - 1], x, length),
//         getSurroundings(input[y], x, length),
//         getSurroundings(input[y + 1], x, length),
//     ]
//     const result = partNumberSurroundings
//         .filter(Boolean)
//         .map(surrounding => {
//             return (surrounding
//                 ?.replaceAll(/\d/g, "")
//                 .replaceAll(/[^*]/g, "") ?? '')


//         })
//     console.log(result);
//     return result.some(Boolean)
// }


const summarize = (acc: number, curr: number) => acc + curr
export {
    getSurrounding,
    summarize,
    extractPartNumbers,
    isSymbolAdjacentToPartNumber,
    extractGear,
    getSurroundings,
    collision
}
