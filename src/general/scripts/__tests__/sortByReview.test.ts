import { sortByReview } from '../sortByReview'

const testData: Card_IF[] = [
  {
    id: '3742314448',
    card_text: {
      face_text: 'cat',
      back_text: '고양이'
    },
    review: {
      review_date: 1643889904482,
      spacing: 26891
    }
  },
  {
    id: '0857515340',
    card_text: {
      face_text: 'fly',
      back_text: '날다'
    },
    review: {
      review_date: 1643889890129,
      spacing: 19208
    }
  },
  {
    id: '1523333763',
    card_text: {
      face_text: 'tree',
      back_text: '나무'
    },
    review: {
      review_date: 1643889892579,
      spacing: 19208
    }
  },
  {
    id: '8184168336',
    card_text: {
      face_text: ' elephant',
      back_text: ' 코끼리'
    },
    review: {
      review_date: 1643889881588,
      spacing: 5000
    }
  },
  {
    id: '6007238526',
    card_text: {
      face_text: ' chopsticks',
      back_text: '젓가락'
    },
    review: {
      review_date: 1643889884912,
      spacing: 9800
    }
  }
]

/* eslint no-magic-numbers: 0, */
/* eslint @typescript-eslint/quotes: 0 */

describe('SortByReview', () => {
  test('SortByReview_SortsReviewDateAscending', () => {
    const sortedArray = sortByReview(testData)
    const secondToLastIndex: number = sortedArray.length - 1

    expect(
      sortedArray.every((ele, index) => {
        // If last card
        if (index === secondToLastIndex) return true
        const nextIndex = index + 1

        // Fail if card not found
        const next = sortedArray[nextIndex]
        if (!next) return false

        // Sorting check
        return ele['review']['review_date'] <= next['review']['review_date']
      })
    ).toBeTruthy()

    expect(
      testData.every((ele, index) => {
        // If last card
        if (index === secondToLastIndex) return true
        const nextIndex = index + 1

        // Fail if card not found
        const next = sortedArray[nextIndex]
        if (!next) return false

        // Sorting check
        return ele['review']['review_date'] <= next['review']['review_date']
      })
    ).toBeFalsy()
  })
})
