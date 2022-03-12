import { generateUniqueID } from '../generateID'

/* eslint no-magic-numbers: 0 */

const hasDuplicates = (array: string[]) => {
  const checkObject = Object.create(null)

  for (let index = 0; index < array.length; ++index) {
    const value: string | undefined = array[index]
    if (!value) return false

    if (value in checkObject) {
      return true
    }
    checkObject[value] = true
  }
  return false
}

describe('generateID', () => {
  test('generateUniqueID_ReturnLength=10', () => {
    expect(generateUniqueID().length).toBe(10)
  })

  test('generateUniqueID_ReturnStringCharAllInt[0-9]', () => {
    expect(generateUniqueID()).toMatch(/[0-9]/u)
  })

  test('generateUniqueID_EachReturnIsUnique', () => {
    const array = []
    for (let index = 0; index < 10000; index++) {
      array.push(generateUniqueID())
    }

    expect(hasDuplicates(array)).toBe(false)
  })
})
