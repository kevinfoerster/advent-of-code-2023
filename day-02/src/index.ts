type ColorAppearances = Array<number>
type Colors = {
    blue: ColorAppearances,
    red: ColorAppearances,
    green: ColorAppearances
}

type Thresholds = {
    blue: number,
    red: number,
    green: number
}

const extractColors = (input: string) => {
    type ColorAppearances = Array<number>
    type Colors = {
        blue: ColorAppearances,
        red: ColorAppearances,
        green: ColorAppearances
    }
    const colors: Colors = {
        blue: [],
        red: [],
        green: []
    }


    Object.keys(colors).forEach(color => {
        const regex = new RegExp(`[0-9]+ ${color}`, 'g')
        const matches = input.match(regex)

        colors[color] = Array.from(matches).map(match => parseInt(match))
    })
    return colors

}

const isWithinThreshold = (colors: Colors, thresholds: Thresholds) => {
    return Object.keys(colors).map(color => {
        if (Math.max(...colors[color]) <= thresholds[color]) {
            return true
        }
        return false
    }).every(Boolean)
}

const extractGameId = (input: string) => {
    const regex = /Game\s[0-9]+/g
    const matches = input.match(regex)
    return parseInt(parseInt(matches[0].split(/\s/)[1]) ?? "0")
}


export { extractColors, isWithinThreshold, extractGameId }