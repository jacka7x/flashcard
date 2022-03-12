type DeepReadonly<T> = {
  readonly [Key in keyof T]: DeepReadonly<T[Key]>
}

// CHECK IF THIS CAN BE CHANGED
type Card_IF_ = DeepReadonly<Card_IF_>
type Deck_IF_ = DeepReadonly<Deck_IF_>

interface Card_Text {
  readonly face_text: string
  readonly back_text: string
}

interface Card_IF {
  readonly card_text: Card_Text
  readonly review: {
    readonly review_date: number
    readonly spacing: number
  }
  readonly id: string
}

interface Deck_IF {
  readonly id: string
  readonly name: string
  readonly cards: Card_IF[]
}

interface DeckInfo {
  readonly name: string
  readonly id: string
  readonly review_count: number
}

type Popups = Reaonly<null | 'addCard'>

type CardFace = Readonly<'front' | 'back'>

type Answer = Readonly<'right' | 'wrong'>
