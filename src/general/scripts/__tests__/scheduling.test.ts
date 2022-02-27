import { getNewSpacingRight } from "../scheduling"

/* eslint no-magic-numbers: 0 */
/* eslint @typescript-eslint/quotes: 0 */

describe('scheduling', () => {

  test('Returns spacing multipled by 1.4', () => {
    expect(getNewSpacingRight(1000)).toBe(1400)
  })

  test('Floors answer of 1398.6 to 1398', () => {
    expect(getNewSpacingRight(999)).toBe(1398)
  })

  const originalError = console.error
  afterEach(() => {
    console.error = originalError
  })

  describe('Input of 0, return and console.error', () => {
    const consoleOutput: string[] = []
    const mockedError = (output: string) => consoleOutput.push(output)
    beforeEach(() => {
      console.error = mockedError
    })

    test('Returns 5000 for input of 0', () => {
      expect(getNewSpacingRight(0)).toBe(5000)
    })

    test('Console.error [0] for input of 0', () => {
      expect(consoleOutput[0]?.toString()).
        toEqual("Error: Card spacing is negative or zero [0]")
    })
  })

  describe('Input of -1, return and console.error', () => {
    const consoleOutput: string[] = []
    const mockedError = (output: string) => consoleOutput.push(output)
    beforeEach(() => {
      console.error = mockedError
    })

    test('Returns 5000 for input of -1', () => {
      expect(getNewSpacingRight(-1)).toBe(5000)
    })

    test('Console.error [0] for input of -1', () => {
      expect(consoleOutput[0]?.toString()).
        toEqual("Error: Card spacing is negative or zero [-1]")
    })
  })
})

export {}
