// import fetch from 'jest-fetch-mock'
import { fetchDecksFromStorage } from "../deckStorage"
import fetch from 'jest-fetch-mock'

const mockData: Deck_IF[] = [
  {
  "name": "korean",
  "id": "1234567890",
  "cards": [
    {
      "id": "3742314448",
      "card_text": {
        "face_text": "cat",
        "back_text": "고양이"
      },
      "review": {
        "review_date": 1643889904482,
        "spacing": 26891
      }
    }
  ]
  },
  {
    "name": "test",
    "id": "1231231230",
    "cards": [
      {
        "id": "5145145143",
        "card_text": {
          "face_text": "cat",
          "back_text": "고양이"
        },
        "review": {
          "review_date": 1643889904483,
          "spacing": 26891
        }
      }
    ]
  }
]

/* eslint no-magic-numbers: 0, */
/* eslint function-paren-newline: 0 */
/* eslint @typescript-eslint/quotes: 0 */

describe('deckStorage', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('fetchDecksFromStorage', () => {

    beforeEach(() => {
      fetch.resetMocks()
    })

    test('fetchDecksFromStorage_ReturnsCorrectData',
      async () => {

      fetch.mockResponseOnce(JSON.stringify(mockData))
      const returnedData = await fetchDecksFromStorage()

      expect(returnedData).toEqual(mockData)
      expect(fetch).toBeCalledTimes(1)
    })

    test('fetchDecksFromStorage_Failure',
      async () => {

      fetch.mockReject(() => Promise.reject(new Error("API Failure")))
      const returnedData = await fetchDecksFromStorage()

      expect(returnedData).toBeNull()
      expect(fetch).toBeCalledTimes(1)
    })
  })
})
