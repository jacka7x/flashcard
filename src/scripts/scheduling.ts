// current deck should include all cards whos current date/time has been passed by the current time

// queue deck should include all cards whos current time is later than the current time

// Wrong answers should send card to top of current deck
// Right answers should multiply spacing my a fixed amount

// for testing purposes, spacing should be in the order of seconds

// multiplier is a percentage e.g. 105 = 5%
const spacingMultiplier = 140

export const getCurrentUnixTime = (): number => {
    return new Date().getTime()
}

export const getNewSpacing = (spacing: number): number => {
    return Math.floor(spacing * spacingMultiplier / 100)
}
