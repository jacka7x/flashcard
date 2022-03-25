import axios from 'axios'
import { base, uId, SC_Success, SC_Created } from './settingsAPI'

export const addDeckCard_db = async (
  card: Card_IF_NoId,
  deck_id: string
): Promise<Card_Id | null> => {
  const url = `${base}/users/${uId}/decks/${deck_id}/cards`
  const body = card

  try {
    const res = await axios.post(url, body)
    if (res.status !== SC_Created) throw new Error('Failed to create deckcard')
    return {
      id_card: res.data.id_card,
      id_ref: res.data.id_ref
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteDeckCard_db = async (
  card_id: string,
  deck_id: string
): Promise<typeof SC_Success | null> => {
  const url = `${base}/users/${uId}/decks/${deck_id}/cards/${card_id}`

  try {
    const res = await axios.delete(url)
    if (res.status !== SC_Success) throw new Error('Failed to delete deckcard')
    return res.status
  } catch (error) {
    console.error(error)
    return null
  }
}
