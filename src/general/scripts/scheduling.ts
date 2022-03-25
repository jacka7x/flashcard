// multiplier is a percentage e.g. 105 = 5%
const spacingMultiplier: number = 1.4
const minSpacing: number = 0
export const spacingBaseValue: number = 5000

export const getCurrentUnixTime = (): number => new Date().getTime()

export const getNewSpacingRight = (spacing: number): number => {
  if (spacing <= minSpacing) {
    console.error(`Card spacing too low [${spacing}]`)
    return spacingBaseValue
  }

  // multiply by card accuracy too!
  return Math.floor(spacing * spacingMultiplier)
}

export const getNewSpacingWrong = (): number => spacingBaseValue
