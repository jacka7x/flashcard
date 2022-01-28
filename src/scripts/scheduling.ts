
// multiplier is a percentage e.g. 105 = 5%
const spacingMultiplier = 140
// this is also set in the db.json
const spacingBaseValue = 5000

export const getCurrentUnixTime = (): number => {
    return new Date().getTime()
}

export const getNewSpacingRight = (spacing: number): number => {
    return Math.floor(spacing * spacingMultiplier / 100)
}

export const getNewSpacingWrong = (): number => {
    return spacingBaseValue
}
