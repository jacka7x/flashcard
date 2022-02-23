
// from deck
import { Deck } from './deck/Deck'

// from popups
import { Popup } from './popups/Popup'

// from general/scripts
import { 
  getCurrentUnixTime,
  getNewSpacingRight,
  getNewSpacingWrong 
} from './general/scripts/scheduling'
import { useInterval } from './general/scripts/useInterval'
import {
  fetchDecksFromStorage,
  pushDeckToStorage
} from './general/scripts/deckStorage'
import { sortByReview } from './general/scripts/sortByReview'
import {
  addCardToDeckInStorage,
  deleteCardFromDeckInStorage
} from './general/scripts/deckStorage'

// react imports
import { useState, useEffect } from 'react'

// dynamically update to period to next review!! 
// test useInterval works properly with updating period
const reviewUpdatePeriod = 200

function App() {
  // console.log('rendered')

  const [currentWorkingDeckState, setCurrentWorkingDeckState]
    = useState<Deck_IF>()

  const [currentTotalDeckState, setCurrentTotalDeckState]
    = useState<Card_IF[]>([])

  // setReviewDeckState should ONLY be called in updateReviewDeck()
  const [currentReviewDeckState, setCurrentReviewDeckState]
    = useState<Card_IF[]>([])

  const [currentReviewCountState, setCurrentReviewCountState]
    = useState<number>(0)

  const [popupState, setPopupState] = useState<Popups>(null)


  // inital loading of decks [some ajustments for testing]
  useEffect(() => {
    loadDeck()
  }, [])

  // update total deck when working deck is changed
  useEffect(() => {
    if (!currentWorkingDeckState) return
    setCurrentTotalDeckState(currentWorkingDeckState['cards'])
  }, [currentWorkingDeckState])

  // update review deck when total deck is changed
  useEffect(() => {
    if(currentWorkingDeckState) {
      pushDeckToStorage(currentWorkingDeckState, currentTotalDeckState)
    }
    updateCurrentReviewDeck()
  }, [currentTotalDeckState])

  // update review deck periodically
  useInterval(() => {
      updateCurrentReviewDeck()
  }, reviewUpdatePeriod)

  // update current review count when review deck is changed
  useEffect(() => {
    setCurrentReviewCountState(currentReviewDeckState.length)
  }, [currentReviewDeckState])

  const loadDeck = async (): Promise<void> => {
    const decks: Deck_IF[] | undefined = await fetchDecksFromStorage()
    if(!decks[0]) return
    
    // FOR TESTING - use only first deck
    const deck = decks[0]

    const newDeck: Deck_IF = {
      id: deck['id'],
      name: deck['name'],
      cards: deck['cards']
    }

    setCurrentWorkingDeckState(newDeck)
    console.log(`Loaded ${decks[0]['name']} [${decks[0]['id']}].`)
  }

  const updateCurrentReviewDeck = (): void => {
    const reviewDeck: Card_IF[]
      = getReviewableCards(currentTotalDeckState)
    const sortedReviewDeck = sortByReview(reviewDeck)
    // setReviewDeckState should NOT be called elsewhere
    setCurrentReviewDeckState(sortedReviewDeck)
  }

  const getReviewableCards = (deck: Card_IF[]): Card_IF[] => {
    const unixTime = getCurrentUnixTime()
    
    const filteredDeck = deck.filter((card) =>
      card['review']['review_date'] < unixTime)

    return filteredDeck
  }

  const updateCard = (answer: Answer, card: Card_IF): void => {
    if (!currentTotalDeckState) return

    const nowUnix: number = getCurrentUnixTime()
    const newSpacing: number = (answer === 'right') ?
      getNewSpacingRight(card['review']['spacing']) :
      getNewSpacingWrong()
    
    // new object for updated card
    const updatedCard: Card_IF = {
      ...card,
      review: {
        review_date: nowUnix + newSpacing,
        spacing: newSpacing
      }
    }

    // find reviewd card by ID 
    const cardIndex: number 
      = currentTotalDeckState.findIndex( (cardTotal) => {
        return cardTotal['id'] === card['id']
    })

    // CHECK THIS WORKS PROPERLY
    const newCurrentTotalDeckState: Card_IF[] = [
        ...currentTotalDeckState.slice(0, cardIndex),
        updatedCard,
        ...currentTotalDeckState.slice(cardIndex + 1)
      ]

    setCurrentTotalDeckState(newCurrentTotalDeckState)
  }

  const addCard =
    async (deck: Deck_IF, newCardText: Card_Text): Promise<void> => {
    
    addCardToDeckInStorage(deck, newCardText)
    loadDeck()
  }

  const deleteCard =
    async (deck: Deck_IF, card: (Card_IF | undefined)): Promise<void> => {
    card ?
      deleteCardFromDeckInStorage(deck, card) :
      console.log('No card to delete, review deck empty.')
    
    loadDeck()
  }

  const openPopup = (popupType: Popups): void => {
    setPopupState(popupType)
  }

  const closePopup = (): void => {
    setPopupState(null)
  }

  return (
    <div className="App">
      {
        currentWorkingDeckState ? 
          <Deck
            workingDeck={currentWorkingDeckState} 
            reviewDeck={currentReviewDeckState}
            reviewCount={currentReviewCountState}
            updateCard={updateCard}
            deleteCard={deleteCard}
            openPopup={openPopup}
          ></Deck> : ''
      }
      {
        popupState ? 
          <Popup
            deck={currentWorkingDeckState}
            popupType={popupState}
            closePopup={closePopup}
            addCard={addCard}
          ></Popup> : ''
      }
    </div>
  )
}

export default App;
