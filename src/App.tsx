// components
import { Deck } from './deck/Deck'
import { Decklist } from './decklist/Decklist'
import { Popup } from './popups/Popup'

// from general/scripts
import {
  getCurrentUnixTime,
  getNewSpacingRight,
  getNewSpacingWrong,
  spacingBaseValue
} from './general/scripts/scheduling'

import { useInterval } from './general/scripts/useInterval'
import { sortByReview } from './general/scripts/sortByReview'

// from general/api
import {
  getAllDecks_db,
  createNewDeck,
  deleteDeck_db
} from './general/api/deckAPI'
import { addDeckCard_db, deleteDeckCard_db } from './general/api/deckCardAPI'
import { updateSpacing_db } from './general/api/userCardAPI'

// react imports
import { useState, useEffect } from 'react'

/* eslint func-style: 0 */
// buggy when using arrow function
const App = () => {
  /* eslint func-style: 2 */

  // dynamically update to period to next review!!
  // test useInterval works properly with updating period
  const reviewUpdatePeriod = 200

  // deck and card states
  const [allDecksState, setAllDecksState] = useState<Deck_IF[]>([])
  const [workingDeckState, setWorkingDeckState] = useState<Deck_IF | null>(null)
  const [reviewPileState, setReviewPileState] = useState<Card_IF[]>([])
  const [popupState, setPopupState] = useState<Popups>(null)

  // inital loading of all decks from database ASYNC????
  useEffect(() => {
    loadDecks()
  }, [])

  // propagate changes in workingDeck into allDecks
  // update review deck
  useEffect(() => {
    updateReviewDeck()
    syncWorkingDeckIntoAll()
  }, [workingDeckState])

  // update review deck periodically
  useInterval(() => {
    updateReviewDeck()
  }, reviewUpdatePeriod)

  const loadDecks = async (): Promise<void> => {
    try {
      const decks: Deck_IF[] | null = await getAllDecks_db()
      if (!decks) throw new Error('No decks found.')
      setAllDecksState(decks)
    } catch (error) {
      console.error(error)
    }
  }

  const syncWorkingDeckIntoAll = async (): Promise<void> => {
    if (!workingDeckState) return
    try {
      const allClone = [...allDecksState]
      const deckIndex = allClone.findIndex((deck) => {
        return deck['id_deck'] === workingDeckState['id_deck']
      })

      if (deckIndex === -1) {
        // correct data should be on database, so reload if syncing decks failes
        throw new Error(
          'Deck not found, failed to update, loading decks again.'
        )
      }

      setAllDecksState([
        ...allClone.slice(0, deckIndex),
        workingDeckState,
        ...allClone.slice(deckIndex + 1)
      ])
    } catch (error) {
      console.error(error)

      // this is async ???
      // MIGHT CAUSE LOOP
      await loadDecks()
    }
  }

  // REVIEW

  const updateReviewDeck = (): void => {
    if (!workingDeckState) return
    const reviewableCards: Card_IF[] = getReviewableCards(
      workingDeckState['cards']
    )
    const sortedReviewDeck = sortByReview(reviewableCards)
    setReviewPileState(sortedReviewDeck)
  }

  const getReviewableCards = (deck: Card_IF[]): Card_IF[] => {
    const unixTime = getCurrentUnixTime()

    const filteredDeck = deck.filter(
      (card) => card['review']['review_date'] < unixTime
    )

    return filteredDeck
  }

  // START CRUD

  const addDeck = async (deckName: string): Promise<void> => {
    try {
      const newDeck = await createNewDeck(deckName)
      if (!newDeck) throw new Error('New deck failed to create')
      setAllDecksState([...allDecksState, newDeck])
      // show GUI success
    } catch (error) {
      console.error(error)
      // show GUI error
    }
  }

  const deleteDeck = async (deckId: string): Promise<void> => {
    try {
      await deleteDeck_db(deckId)
      // show GUI progress
      setAllDecksState(
        allDecksState.filter((deck: Deck_IF) => {
          return deck['id_deck'] !== deckId
        })
      )
      // show GUI sucess
    } catch (error) {
      console.error(error)
      // show GUI error
    }
  }

  const addDeckCard = async (
    newCardText: Card_Text,
    deckId: string
  ): Promise<void> => {
    try {
      if (!workingDeckState) throw new Error('No current working deck.')

      const newCardData: Card_IF_NoId = {
        card_text: newCardText,
        review: {
          review_date: getCurrentUnixTime(),
          spacing: spacingBaseValue
        }
      }

      const resData = await addDeckCard_db(newCardData, deckId)
      if (!resData) throw new Error('New card failed to create')

      const newDeck: Deck_IF = {
        ...workingDeckState,
        cards: [
          ...workingDeckState['cards'],
          {
            id_card: resData.id_card,
            id_ref: resData.id_ref,
            ...newCardData
          }
        ]
      }

      setWorkingDeckState(newDeck)
    } catch (error) {
      console.error(error)
      // show GUI error
    }
  }

  const deleteCardFromDeck = async (
    cardId: string,
    deckId: string
  ): Promise<void> => {
    try {
      if (!workingDeckState) throw new Error('No working deck selected.')

      const newWorkingCards = workingDeckState['cards'].filter((card) => {
        return card['id_card'] !== cardId
      })

      if (workingDeckState['cards'].length - 1 !== newWorkingCards.length) {
        throw new Error('Card failed to delete from working deck')
      }

      setWorkingDeckState({
        ...workingDeckState,
        cards: newWorkingCards
      })

      await deleteDeckCard_db(cardId, deckId)
    } catch (error) {
      console.error(error)
      // show GUI error
    }
  }

  const updateCard = (answer: Answer, card: Card_IF): void => {
    if (!workingDeckState) return
    const workingCards = workingDeckState['cards']
    const { id_ref } = card
    const nowUnix = getCurrentUnixTime()
    const newSpacing =
      answer === 'right'
        ? getNewSpacingRight(card['review']['spacing'])
        : getNewSpacingWrong()
    const reviewDateUnix = nowUnix + newSpacing

    const updatedCard: Card_IF = {
      ...card,
      review: {
        review_date: reviewDateUnix,
        spacing: newSpacing
      }
    }

    const cardIndex = workingCards.findIndex((cardWorking) => {
      return cardWorking['id_card'] === card['id_card']
    })

    const newWorkingDeckCards = [
      ...workingCards.slice(0, cardIndex),
      updatedCard,
      ...workingCards.slice(cardIndex + 1)
    ]

    setWorkingDeckState({
      ...workingDeckState,
      cards: newWorkingDeckCards
    })

    try {
      if (!id_ref) throw new Error('Card id_ref not found.')
      updateSpacing_db(id_ref, reviewDateUnix, newSpacing)
    } catch (error) {
      console.error(error)
    }
  }

  // DECK SELECTION

  const selectDeck = (deckId: string): void => {
    try {
      if (!allDecksState) throw new Error('Decks not found.')

      const selectedDeck: Deck_IF | undefined = allDecksState.find((deck) => {
        return deck['id_deck'] === deckId
      })

      if (selectedDeck) {
        setWorkingDeckState(selectedDeck)
      } else {
        setWorkingDeckState(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const goToSelectDeck = (): void => {
    setWorkingDeckState(null)
  }

  // POPUPS

  const openPopup = (popupType: Popups): void => {
    setPopupState(popupType)
  }

  const closePopup = (): void => {
    setPopupState(null)
  }

  return (
    <div className={'App'}>
      {workingDeckState ? (
        <Deck
          workingDeck={workingDeckState}
          reviewPile={reviewPileState}
          goToSelectDeck={goToSelectDeck}
          updateCard={updateCard}
          deleteCardFromDeck={deleteCardFromDeck}
          openPopup={openPopup}
        />
      ) : (
        <Decklist
          allDecksState={allDecksState}
          selectDeck={selectDeck}
          addDeck={addDeck}
          deleteDeck={deleteDeck}
        />
      )}

      {/* MOVE INTO DECK */}

      {popupState ? (
        <Popup
          deck={workingDeckState}
          popupType={popupState}
          closePopup={closePopup}
          addDeckCard={addDeckCard}
        />
      ) : null}
    </div>
  )
}

export default App
