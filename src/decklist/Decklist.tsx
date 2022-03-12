
import { DeckListItem } from './components/DeckListItem'
import { NewDeckButton } from './components/NewDeckButton'
import { generateUniqueID } from '../general/scripts/generateID'
import { createNewDeck } from '../general/api/deckAPI'

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

  const addDeck = async (deckName: string): Promise<void> => {
    try {
      await createNewDeck(deckName)
      console.log(deckName)
      // show GUI success
    } catch (error) {
      console.error(error)
      // show GUI error
    }
  }

  return (
    <div className={'decklist'}>
      <div className={'decklist-list'}>

        <h1 className={'decklist-title'}>
          {'Select Deck'}
        </h1>

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

      <NewDeckButton
        addDeck={addDeck}
      />
    </div>
  )
}
