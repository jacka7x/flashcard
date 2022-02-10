import { getNewSpacingRight } from "../scheduling";

test('returns spacing multipled by 1.4', () => {
    expect(getNewSpacingRight(1000)).toBe(1400)
})

test('Floors answer of 1398.6 to 1398', () => {
    expect(getNewSpacingRight(999)).toBe(1398)
})

// repeat these tests (.each? loop?)
test('Returns 5000 for input of 0 and throws error', () => {
    expect(getNewSpacingRight(0)).toBe(5000)
})

test('Returns 5000 for negative input and throws error', () => {
    expect(getNewSpacingRight(-1)).toBe(5000)
})

export {}