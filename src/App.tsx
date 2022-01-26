// types and interfaces
import { Card_IF, CardState, Answer } from './interfaces'

// from components
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { CardButtons } from './components/CardButtons'

// from scripts
import { getCurrentUnixTime, getNewSpacing } from './scripts/scheduling'

// react imports
import { useState, useEffect } from 'react'

// change/remove this later for when last card is removed
const noCard: Card_IF = {
  card_text: {
    faceText: 'No Card.',
    backText: 'No Card'
  },
  review: {
    review_date: 0,
    spacing: 0
  }
}

function App() {
  const [deckState, setDeckState] = useState<Card_IF[]>([])
  const [cardState, setCardState] = useState<CardState>('front')
  const topCard: Card_IF | undefined = deckState[0] ? deckState[0] : noCard

  const fetchDeck = async () => {
    const response = await fetch('http://172.30.1.35:5000/deck')
    const data: Card_IF[] = await response.json()

    // for texting purposes, set all reveiws to current time
    return data.map( card => {
      card['review']['review_date'] = getCurrentUnixTime()
      return card
    })
  }

  useEffect(() => {
    const getDeck = async () => {
      const deck: Card_IF[] = await fetchDeck()
      setDeckState(deck)
    }

    getDeck()
  }, [])

  const showAnswer = (): void => {
    setCardState('back')
  }

  const nextCard = (): void => {

    // CHANGE THIS TO NOT MUTATE AND ONLY SETSTATE()
    // PUT IN NEW FUNCTION AND MOVE ALL THIS SHIT TO A SCRIPT FILE
    const shift: Card_IF | undefined = deckState.shift()
    if (!shift) return
    deckState.push(shift)
    setDeckState(deckState)

    setCardState('front')
  }

  const updateCard = (newSpacing: number): void => {
    if (deckState[0]) {
      deckState[0]['review']['spacing'] = newSpacing
    }
    setDeckState(deckState)
    console.log(newSpacing)
    console.log(deckState)
  }

  const processAnswer = (answer: Answer): void => {
    if (answer === 'right') {
      const newSpacing = getNewSpacing(topCard['review']['spacing'])
      updateCard(newSpacing)
    }
    
    nextCard()
  }

  return (
    <div className="App">

      <Navbar></Navbar>

      <Card
        card={topCard}
        state={cardState}
      ></Card>
      
      <CardButtons
        state={cardState}
        onMouseUp={showAnswer}
        answer={processAnswer}
      ></CardButtons> 
    </div>
  )
}

export default App;
