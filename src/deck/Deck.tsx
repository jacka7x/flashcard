// from components
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { CardButtons } from './components/CardButtons'

// react imports
import { useState, useEffect } from 'react'

interface Props {
  workingDeck: Deck_IF
  reviewPile: Card_IF[]
  goToSelectDeck: () => void
  updateCard: (answer: Answer, card: Card_IF) => void
  deleteCardFromDeck: (card_id: string, deck_id: string) => Promise<void>
  openPopup: (popupType: Popups) => void
}

// change/remove this later for when last card is removed
const noCard: Card_IF = {
  card_text: {
    face_text: 'No Card.',
    back_text: 'No Card'
  },
  review: {
    review_date: 0,
    spacing: 0
  },
  id_card: 'TESTID'
}

export const Deck = ({
  workingDeck,
  reviewPile,
  goToSelectDeck,
  updateCard,
  deleteCardFromDeck,
  openPopup
}: Props) => {
  const [cardState, setCardState] = useState<Card_IF | undefined>()
  const [reviewCount, setReviewCount] = useState<number>(0)
  const [cardFace, setCardFace] = useState<CardFace>('front')

  const showAnswer = (): void => {
    setCardFace('back')
  }

  const nextCard = (): void => {
    setCardFace('front')
  }

  const processAnswer = (answer: Answer): void => {
    if (!cardState) return
    updateCard(answer, cardState)
    nextCard()
  }

  // update current card [ASSUMES SORTED BY REVEIW DATE]
  useEffect(() => {
    setCardState(reviewPile[0])
    setReviewCount(reviewPile.length)
  }, [reviewPile])

  return (
    <div className={'deck'}>
      <Navbar
        workingDeck={workingDeck}
        reviewPile={reviewPile}
        reviewCount={reviewCount}
        goToSelectDeck={goToSelectDeck}
        deleteCardFromDeck={deleteCardFromDeck}
        openPopup={openPopup}
      />

      <Card card={cardState ? cardState : noCard} cardFace={cardFace} />

      <CardButtons
        reviewCount={reviewCount}
        cardFace={cardFace}
        showAnswer={showAnswer}
        answer={processAnswer}
      />
    </div>
  )
}
