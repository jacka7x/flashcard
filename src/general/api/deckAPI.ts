import axios from 'axios'
import { base, uId, SC_Created, SC_Success } from './settingsAPI'

export const getAllDecks_db = async (): Promise<Deck_IF[] | null> => {
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

export const deleteDeck_db = async (
  deckId: string
): Promise<typeof SC_Success | null> => {
  const url = `${base}/users/${uId}/decks/${deckId}`

  try {
    const res = await axios.delete(url)
    if (res.status !== SC_Success) throw new Error('Failed to delete deck')
    return SC_Success
  } catch (error) {
    console.error(error)
    return null
  }
}
