// multiplier is a percentage e.g. 105 = 5%
const spacingMultiplier: number = 1.4
// this is also set in the db.json
const spacingBaseValue: number = 5000

const minSpacing: number = 0

export const getCurrentUnixTime = (): number => new Date().getTime()

export const getNewSpacingRight = (spacing: number): number => {
  try {
    if (spacing <= minSpacing) {
      throw new Error(`Card spacing is negative or zero [${spacing}]`)
    }
  } catch (error) {
    console.error(error)
    return spacingBaseValue
  }

  return Math.floor(spacing * spacingMultiplier)
}

export const getNewSpacingWrong = (): number => spacingBaseValue
