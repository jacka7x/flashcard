import axios from 'axios'

const base = 'https://us-central1-flashcard-92732.cloudfunctions.net/api'
const uId = '7D7vg4gPqCRZPhSFNLBs'

export const getAllDecks = async (): Promise<Deck_IF[] | null> => {
  const url = base + `/users/${uId}/decks`

  try {
    const res = await axios.get(url)
    const decks: Deck_IF[] = res.data
    return decks
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getDeck = () => {}

export const createNewDeck = async (
  deckName: string
): Promise<number | null> => {
  const url = base + `/users/${uId}/decks`
  const body: DECK = {
    name: deckName
  }

  try {
    const res = await axios.post(url, body)
    return res.status
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateDeck = () => {}

export const deleteDeck = () => {}
