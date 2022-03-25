import axios from 'axios'
import { base, uId, SC_Success } from './settingsAPI'

// updating review time updates usercard and in all decks
export const updateSpacing_db = async (
  id_ref: string,
  reviewDateUnix: number,
  newSpacing: number
): Promise<typeof SC_Success | null> => {
  const url = `${base}/users/${uId}/cards/${id_ref}`
  const body: { review: Card_Review } = {
    review: {
      review_date: reviewDateUnix,
      spacing: newSpacing
    }
  }

  try {
    const res = await axios.patch(url, body)
    if (res.status !== SC_Success) throw new Error('Failed to update spacing')

    return res.status
  } catch (error) {
    console.error(error)
    return null
  }
}
