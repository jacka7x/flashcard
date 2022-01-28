
interface Card_IF {
    readonly card_text: {
      readonly faceText: string
      readonly backText: string
    },
    readonly review: {
      readonly review_date: number,
      readonly spacing: number
    }
}
  
type CardState = Readonly<'front' | 'back'>

type Answer = Readonly<'right' | 'wrong'>