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

interface Card_Review {
  readonly review_date: number
  readonly spacing: number
}

interface Card_Id {
  readonly id_card: string
  readonly id_ref: string
}

interface Card_IF {
  readonly card_text: Card_Text
  readonly review: Card_Review
  readonly id_card: string
  readonly id_ref?: string
}

interface Card_IF_NoId {
  readonly card_text: Card_Text
  readonly review: {
    readonly review_date: number
    readonly spacing: number
  }
}

interface Deck_IF {
  readonly id_deck: string
  readonly name: string
  readonly cards: Card_IF[]
}

interface DeckInfo {
  readonly id: string
  readonly name: string
  readonly review_count: number | undefined
}

type Popups = Reaonly<null | 'addCard'>

type CardFace = Readonly<'front' | 'back'>

type Answer = Readonly<'right' | 'wrong'>
