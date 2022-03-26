import { DeckListItem } from './components/DeckListItem'
import { NewDeckButton } from './components/NewDeckButton'
import { generateUniqueID } from '../general/scripts/generateID'
import { useState, useEffect } from 'react'

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

  const getDeckInfo = (): DeckInfo[] => {
    if (!allDecksState) return []

    const deckInfo: DeckInfo[] = allDecksState.map((deck) => {
      return {
        name: deck['name'],
        id_deck: deck['id_deck'],
        review_count: 5
      }
    })

    return deckInfo
  }

  return (
    <div className={'decklist'}>
      <div className={'decklist-list'}>
        <h1 className={'decklist-title'}>{'Select Deck'}</h1>

        {deckListInfoState
          ? deckListInfoState.map((item) => (
              <DeckListItem
                deckInfoItem={item}
                key={generateUniqueID()}
                onClick={() => selectDeck(item['id_deck'])}
                deleteDeck={deleteDeck}
              />
            ))
          : ''}
      </div>

      <NewDeckButton addDeck={addDeck} />
    </div>
  )
}
