import { generateUniqueID } from '../generateID'

describe('generateID', () => {

    test('generateUniqueID_ReturnLength=10', () => {
        expect(generateUniqueID().length).toBe(10)
    })  

    test('generateUniqueID_ReturnStringCharAllInt[0-9]', () => {
        expect(generateUniqueID()).toMatch(/[0-9]/)
    })
    
    test('generateUniqueID_EachReturnIsUnique', () => {
        let array = []
        for (let i = 0; i < 10000; i++) {
            array.push(generateUniqueID())
        }

        expect(hasDuplicates(array)).toBe(false)
    })
})

const hasDuplicates = (array: string[]) => {
    let checkObject = Object.create(null);

    for (let i = 0; i < array.length; ++i) {
        let value: string | undefined = array[i];
        if (!value) return false

        if (value in checkObject) {
            return true;
        }
        checkObject[value] = true;
    }
    return false;
}