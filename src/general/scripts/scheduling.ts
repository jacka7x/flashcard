
// multiplier is a percentage e.g. 105 = 5%
const spacingMultiplier: number = 1.4
// this is also set in the db.json
const spacingBaseValue: number = 5000

export const getCurrentUnixTime = (): number => new Date().getTime()

export const getNewSpacingRight = (spacing: number): number => {
    return Math.floor(spacing * spacingMultiplier)
}

export const getNewSpacingWrong = (): number => spacingBaseValue
