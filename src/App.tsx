// types and interfaces
import { Card_IF, CardState, Answer } from './interfaces'

// from components
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { CardButtons } from './components/CardButtons'

// from scripts
import { 
  getCurrentUnixTime,
  getNewSpacingRight,
  getNewSpacingWrong 
} from './scripts/scheduling'

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
  const [totalDeckState, setTotalDeckState] = useState<Card_IF[]>([])

  // setReviewDeckState should NOT be called
  const [reviewDeckState, setReviewDeckState] = useState<Card_IF[]>([])
  const [cardState, setCardState] = useState<CardState>('front')
  const currentCard: Card_IF | undefined = reviewDeckState[0]

  console.log('Render')
  console.log(' ')

  useEffect(() => {
    const getDeck = async () => {

      // database should be sorted by reveiw date
      const deck: Card_IF[] = await fetchDeckFromDB()
      setTotalDeckState(deck)
    }
    
    getDeck()
  }, [])

  useEffect(() => {
    const newReveiwDeck: Card_IF[] = getReviewableCards()
    setReviewDeckState(newReveiwDeck)
  }, [totalDeckState, cardState])

  console.log('total / review deck (after useEffects)')
  console.log(totalDeckState)
  console.log(reviewDeckState)
  console.log(' ');console.log(' ');console.log(' ')

  const fetchDeckFromDB = async () => {
    console.log('Fetching from DB...')
    
    const response = await fetch('http://172.30.1.35:5000/deck')
    const data: Card_IF[] = await response.json()

    // for testing purposes, set all reveiws to current time
    console.log('Setting inital spacing values...')
    console.log(`Base spacing set to ${getNewSpacingWrong()}`)
    console.log(`Current Unix time: ${getCurrentUnixTime()}`)
    return data.map( card => {
      
      card['review']['review_date'] = 
        getCurrentUnixTime() + getNewSpacingWrong()
      card['review']['spacing'] = getNewSpacingWrong()
      return card
    })
  }

  const getReviewableCards = (): Card_IF[] => {
    const nowUnix= getCurrentUnixTime()
    const filteredDeck = totalDeckState.filter(
      
      (card) => {
      console.log(card['review']['review_date'] - nowUnix)
      return card['review']['review_date'] < nowUnix
    })

    return filteredDeck
  }

  const showAnswer = (): void => {
    setCardState('back')
  }

  const nextCard = (): void => {
    setCardState('front')
  }

  const processAnswer = (answer: Answer): void => {
    updateCard(answer)
    nextCard()
  }

  const updateCard = (answer: Answer): void => {
    if (!currentCard) return

    const nowUnix = getCurrentUnixTime()

    // set review period based on answer and card difficulty
    if (answer === 'right') {
      const oldSpacing = currentCard['review']['spacing']
      const newSpacing = getNewSpacingRight(oldSpacing)

      currentCard['review']['review_date'] = nowUnix + newSpacing
      currentCard['review']['spacing'] = newSpacing
    } else {
      const newSpacing = getNewSpacingWrong()
      
      currentCard['review']['review_date'] = nowUnix + newSpacing
      currentCard['review']['spacing'] = newSpacing
    }

    // remove current card from totalDeck and add crrent card to end
    // THIS ASSUMES TOTAL DECK IS SORTED EACH RENDER TO WORK WELL
    // REVISIT THIS
    const newTotalDeckState: Card_IF[] =
      [...totalDeckState.slice(1), currentCard]

    setTotalDeckState(newTotalDeckState)
  }

  return (
    <div className="App">

      <Navbar></Navbar>

      <Card
        card={currentCard ? currentCard : noCard}
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
