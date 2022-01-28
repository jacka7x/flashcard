
// from components
import { Navbar } from './components/Navbar'
import { Card } from './components/Card'
import { CardButtons } from './components/CardButtons'

// from decks
import { fetchDeckFromDB } from './decks/deckLoading'

// from scripts
import { 
  getCurrentUnixTime,
  getNewSpacingRight,
  getNewSpacingWrong 
} from './scripts/scheduling'

// react imports
import { useState, useEffect, useRef } from 'react'

// Google Analyitics with ReactGA
// import ReactGA from 'react-ga';
// ReactGA.initialize('G-2ZJPT3PNYD');
// ReactGA.pageview(window.location.pathname + window.location.search);

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

const reviewUpdatePeriod: number = 500

function useInterval(callback: Function, delay: number | null) {
  const savedCallback: React.MutableRefObject<Function | undefined> = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current= callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback.current) {
         savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay]);
}

function App() {
  // console.clear()
  // reportWebVitals(console.log)
  console.log('rendered')

  const [totalDeckState, setTotalDeckState] = useState<Card_IF[]> ([])

  // setReviewDeckState should ONLY be called in updateReviewDeck()
  const [reviewDeckState, setReviewDeckState] = useState<Card_IF[]> ([])
  const [reviewCountState, setReviewCountState] = useState<number> (0)
  
  const [currentCardState, setCurrentCardState] = useState<Card_IF | undefined> (undefined)
  const [cardState, setCardState] = useState<CardState> ('front')


  // inital loading of deck from database
  useEffect(() => {
    const getDeck = async () => {
      // database should be sorted by reveiw date
      const totalDeck: Card_IF[] = await fetchDeckFromDB()
      setTotalDeckState(totalDeck)
    }
    getDeck()
  }, [])

  // update review pile and counter
  useInterval(() => {
      updateReviewDeck()
  }, reviewUpdatePeriod)

  useEffect(() => {
    console.clear()
    
    updateReviewDeck()
  }, [totalDeckState, cardState])

  useEffect(() => {
    setReviewCountState(reviewDeckState.length)
  }, [reviewDeckState])

  // update currentCard
  useEffect(() => {
    setCurrentCardState(reviewDeckState[0])
  }, [reviewDeckState])

  const updateReviewDeck = (): void => {
    const newReviewDeck: Card_IF[] = getReviewableCards()

    // setReviewDeckState should NOT be called elsewhere
    setReviewDeckState(newReviewDeck)
  }

  const getReviewableCards = (): Card_IF[] => {
    const nowUnix = getCurrentUnixTime()

    const filteredDeck = totalDeckState.filter(
      (card) =>  card['review']['review_date'] < nowUnix)
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
    if (!currentCardState) return

    const nowUnix = getCurrentUnixTime()
    const newSpacing = (answer === 'right') ?
      getNewSpacingRight(currentCardState['review']['spacing']) :
      getNewSpacingWrong()

    const updatedCard: Card_IF = {
      ...currentCardState,
      review: {
        review_date: nowUnix + newSpacing,
        spacing: newSpacing
      }
    }

    // remove current card from totalDeck and add current card to end
    // THIS ASSUMES TOTAL DECK IS SORTED EACH RENDER TO WORK WELL
    // REVISIT THIS
    const newTotalDeckState: Card_IF[] =
      [...totalDeckState.slice(1), updatedCard]

    setTotalDeckState(newTotalDeckState)
  }



  return (
    <div className="App">

      <Navbar reviewCount={reviewCountState}></Navbar>

      <Card
        card={currentCardState ? currentCardState : noCard}
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
