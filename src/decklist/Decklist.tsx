import { DeckListItem } from './components/DeckListItem'
import { NewDeckButton } from './components/NewDeckButton'
import { generateUniqueID } from '../general/scripts/generateID'
import { useInterval, reviewUpdatePeriod } from '../general/scripts/useInterval'
import { useState, useEffect } from 'react'
import { getCurrentUnixTime } from '../general/scripts/scheduling'

// Change this to new type DeckListData -> update and pass from app
interface Props {
  allDecksState: Deck_IF[]
  selectDeck: (deckId: string) => void
  addDeck: (deckName: string) => Promise<void>
  deleteDeck: (deckId: string) => Promise<void>
}

export const Decklist = ({
  allDecksState,
  selectDeck,
  addDeck,
  deleteDeck
}: Props) => {
  const [deckListInfoState, setDeckListInfoState] = useState<DeckInfo[]>([])

  useEffect(() => {
    const info: DeckInfo[] = getDeckInfo()
    setDeckListInfoState(info)
  }, [allDecksState])

  // update review deck periodically
  useInterval(() => {
    const info: DeckInfo[] = getDeckInfo()
    setDeckListInfoState(info)
  }, reviewUpdatePeriod)

  const getDeckInfo = (): DeckInfo[] => {
    if (!allDecksState) return []

    const deckInfo: DeckInfo[] = allDecksState.map((deck) => {
      return {
        name: deck['name'],
        id_deck: deck['id_deck'],
        review_count: countReviewableCards(deck)
      }
    })

    return deckInfo
  }

  const countReviewableCards = (deck: Deck_IF): number => {
    const unixTime = getCurrentUnixTime()

    return deck['cards'].reduce((count, card) => {
      return card['review']['review_date'] <= unixTime
        ? count + 1
        : count
    }, 0)
  }

  return (
    <div className={'decklist'}>
      <div className={'decklist-list'}>
        <h1 className={'decklist-title'}>{'Select Deck'}</h1>

        {deckListInfoState.length > 0
          ? deckListInfoState.map((item) => (
              <DeckListItem
                deckInfoItem={item}
                key={generateUniqueID()}
                onClick={() => selectDeck(item['id_deck'])}
                deleteDeck={deleteDeck}
              />
            ))
          : <p className={'empty-decklist-message'}>{'No decks'}</p>}
      </div>

      <NewDeckButton addDeck={addDeck} />
    </div>
  )
}
