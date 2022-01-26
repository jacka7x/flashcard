
export interface Card_IF {
    card_text: {
      faceText: string
      backText: string
    },
    review: {
      review_date: number,
      spacing: number
    }
  }
  
export type CardState = 'front' | 'back'

export type Answer = 'right' | 'wrong'