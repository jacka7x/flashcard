import axios from 'axios'
import { base, uId, SC_Created } from './settingsAPI'

export const getAllDecks = async (): Promise<Deck_IF[] | null> => {
  const url = `${base}/users/${uId}/decks`

  try {
    const res = await axios.get(url)
    const allDecks: Deck_IF[] = res.data.map((item: Deck_IF) => {
      return {
        id_deck: item.id_deck,
        name: item.name,
        cards: item.cards
      }
    })

    return allDecks
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createNewDeck = async (
  deckName: string
): Promise<Deck_IF | null> => {
  const url = `${base}/users/${uId}/decks`
  const body: DECK = {
    name: deckName
  }

  try {
    const res = await axios.post(url, body)
    if (res.status !== SC_Created) throw new Error('Failed to create deck')
    return {
      id_deck: res.data,
      name: body.name,
      cards: []
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateDeck = () => null

export const deleteDeck = () => null
