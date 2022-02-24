
// from components
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { CardButtons } from './components/CardButtons'

// react imports
import { useState, useEffect } from 'react'

interface Props {
  workingDeck: Deck_IF
  reviewPile: Card_IF[]
  reviewCount: number
  updateCard: (answer: Answer, card: Card_IF) => void
  deleteCard: (deck: Deck_IF, oldCard: Card_IF | undefined) => Promise<void>
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
  id: '1234567890'
}
  
export const Deck = ( 
  {workingDeck, reviewPile, reviewCount,
    updateCard, deleteCard, openPopup}: Props ) => {

  const [currentCardState, setCurrentCardState] =
    useState<Card_IF | undefined>(undefined)

  const [cardFace, setCardFace] = useState<CardFace>('front')

  const showAnswer = (): void => {
    setCardFace('back')
  }

  const nextCard = (): void => {
    setCardFace('front')
  }

  const processAnswer = (answer: Answer): void => {
    if(!currentCardState) return
    updateCard(answer, currentCardState)
    nextCard()
  }

  // update current card [ASSUMES SORTED BY REVEIW DATE]
  useEffect(() => {
    setCurrentCardState(reviewPile[0])
  }, [reviewPile])


  return (
      <div className='App'>
  
        <Navbar
          workingDeck={workingDeck}
          reviewPile={reviewPile}
          reviewCount={reviewCount}
          deleteCard={deleteCard}
          openPopup={openPopup}
        ></Navbar>
  
        <Card
          card={currentCardState ? currentCardState : noCard}
          cardFace={cardFace}
        ></Card>
        
        <CardButtons
          reviewCount={reviewCount}
          cardFace={cardFace}
          showAnswer={showAnswer}
          answer={processAnswer}
        ></CardButtons> 
      </div>
  )
}
