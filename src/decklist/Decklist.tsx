
import { DeckListItem } from './components/DeckListItem'
import { NewDeckButton } from './components/NewDeckButton'
import { generateUniqueID } from '../general/scripts/generateID'

import { useState, useEffect } from 'react'

// Change this to new type DeckListData -> update and pass from app
interface Props {
  allDecksState: Deck_IF[] | undefined
  getDeckInfo: () => DeckInfo[] | null
  selectDeck: (deckId: string) => void
}

export const Decklist = ({allDecksState,
   getDeckInfo, selectDeck }: Props) => {

  const [deckListInfoState, setDeckListInfoState] =
    useState<DeckInfo[] | null>(null)

  useEffect(() => {
    const info: DeckInfo[] | null = getDeckInfo()
    setDeckListInfoState(info)
  }, [allDecksState])

  return (
    <div className={'decklist'}>
      <h1 className={'decklist-title'}>
        {'Select Deck'}
      </h1>

      <div className={'decklist-list'}>
        {
          deckListInfoState
            ? deckListInfoState.map((item) => (
              <DeckListItem
                deckInfoItem={item}
                key={generateUniqueID()}
                onClick={() => selectDeck(item['id'])}
              />
            ))
            : ''
        }
      </div>

      <NewDeckButton />
    </div>
  )
}
