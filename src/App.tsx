
// components
import { Deck } from './deck/Deck'
import { Decklist } from './decklist/Decklist'
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
  // all decks states
  const [allDecksState, setAllDecksState]
    = useState<Deck_IF[]>()

  // current deck states
  const [currentWorkingDeckState, setCurrentWorkingDeckState]
    = useState<Deck_IF | null>(null)

  const [currentTotalPileState, setCurrentTotalPileState]
    = useState<Card_IF[]>([])

  const [currentReviewPileState, setCurrentReviewPileState]
    = useState<Card_IF[]>([])

  const [currentReviewCountState, setCurrentReviewCountState]
    = useState<number>(0)

  const [popupState, setPopupState] = useState<Popups>(null)


  // inital loading of decks [some ajustments for testing]
  useEffect(() => {
    loadDecks()
  }, [])

  // update total deck when working deck is changed
  useEffect(() => {
    if (!currentWorkingDeckState) return
    setCurrentTotalPileState(currentWorkingDeckState['cards'])
  }, [currentWorkingDeckState])

  // update review deck when total deck is changed
  useEffect(() => {
    if(currentWorkingDeckState) {
      pushDeckToStorage(currentWorkingDeckState, currentTotalPileState)
    }
    updateCurrentReviewDeck()
  }, [currentTotalPileState])

  // update review deck periodically
  useInterval(() => {
      updateCurrentReviewDeck()
  }, reviewUpdatePeriod)

  // update current review count when review deck is changed
  useEffect(() => {
    setCurrentReviewCountState(currentReviewPileState.length)
  }, [currentReviewPileState])

  const loadDecks = async (): Promise<void> => {
    try {
      const decks: Deck_IF[] | null = await fetchDecksFromStorage()
      if(!decks) throw new Error ('No decks found.')
    
      setAllDecksState(decks)
      console.log(`Loaded ${decks.length} deck${
        decks.length === 1 ? '':'s'}.`)
    } catch (error) {
      console.error(error)
    }
  }

  const getDeckInfo = (): DeckInfo[] | null => {
    if (!allDecksState) return null

    const deckInfo: DeckInfo[] = allDecksState.map ( (deck) => {
      return {
        name: deck['name'],
        id: deck['id'],
        review_count: 5
      }
    })

    return deckInfo
  }

  const updateCurrentReviewDeck = (): void => {
    const reviewDeck: Card_IF[]
      = getReviewableCards(currentTotalPileState)
    const sortedReviewDeck = sortByReview(reviewDeck)
    // setReviewDeckState should NOT be called elsewhere
    setCurrentReviewPileState(sortedReviewDeck)
  }

  const getReviewableCards = (deck: Card_IF[]): Card_IF[] => {
    const unixTime = getCurrentUnixTime()
    
    const filteredDeck = deck.filter((card) =>
      card['review']['review_date'] < unixTime)

    return filteredDeck
  }

  const updateCard = (answer: Answer, card: Card_IF): void => {
    if (!currentTotalPileState) return

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
      = currentTotalPileState.findIndex( (cardTotal) => {
        return cardTotal['id'] === card['id']
    })

    // CHECK THIS WORKS PROPERLY
    const newCurrentTotalDeckState: Card_IF[] = [
        ...currentTotalPileState.slice(0, cardIndex),
        updatedCard,
        ...currentTotalPileState.slice(cardIndex + 1)
      ]

    setCurrentTotalPileState(newCurrentTotalDeckState)
  }

  const addCard =
    async (deck: Deck_IF, newCardText: Card_Text): Promise<void> => {
    
    addCardToDeckInStorage(deck, newCardText)
    loadDecks()
  }

  const deleteCard =
    async (deck: Deck_IF, card: (Card_IF | undefined)): Promise<void> => {
    card ?
      deleteCardFromDeckInStorage(deck, card) :
      console.log('No card to delete, review deck empty.')
    
    loadDecks()
  }

  const openPopup = (popupType: Popups): void => {
    setPopupState(popupType)
  }

  const closePopup = (): void => {
    setPopupState(null)
  }

  const selectDeck = (deckId: string): void => {
    try {
      if (!allDecksState) throw new Error ('Decks not found.')

      const selectedDeck: Deck_IF | undefined 
        = allDecksState.find( deck => {
        return deck['id'] === deckId
      })

      if (selectedDeck) {
        setCurrentWorkingDeckState(selectedDeck)
      } else {
        setCurrentWorkingDeckState(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      {
        currentWorkingDeckState ? 
          <Deck
            workingDeck={currentWorkingDeckState} 
            reviewPile={currentReviewPileState}
            reviewCount={currentReviewCountState}
            updateCard={updateCard}
            deleteCard={deleteCard}
            openPopup={openPopup}
          ></Deck> :
          <Decklist
            allDecksState={allDecksState}
            getDeckInfo={getDeckInfo}
            selectDeck={selectDeck}
          ></Decklist>
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
