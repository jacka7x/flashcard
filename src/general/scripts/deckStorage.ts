import { generateUniqueID } from "./generateID"
import { getCurrentUnixTime, getNewSpacingWrong } from "./scheduling"

export const fetchDecksFromStorage = async (): Promise<Deck_IF[]> => {
  console.log('Fetching from DB...')

  const url: string = 'http://172.30.1.35:5000/deck_list'
  const response: Response = await fetch(url)
  const data: Deck_IF[] = await response.json()
  return data
}

export const pushDeckToStorage =
  async (deck: Deck_IF, newCards: Card_IF[]): Promise<number> => {

  const url: string = `http://172.30.1.35:5000/deck_list/${deck['id']}`
  const body: string = JSON.stringify({
    name: deck['name'],
    id: deck['id'],
    cards: newCards
  })

  const response: Response = await fetch(url, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: body
  })

  console.log(`Pushed ${deck['name']} [${deck['id']}] to DB.`)
  return response['status']
}

export const addCardToDeckInStorage = async (deck: Deck_IF, newCardText: Card_Text): Promise<void> => {
  

  const newCard: Card_IF = {
      id: generateUniqueID(),
      card_text: newCardText,
      review: {
        review_date: getCurrentUnixTime(),
        spacing: getNewSpacingWrong()
      }
  }

  const newCards = [...deck['cards'].slice(), newCard]

  await pushDeckToStorage(deck, newCards)
  console.log(`Added ${newCardText['face_text']} to ${deck['name']}.`)
}

export const deleteCardFromDeckInStorage =
  async (deck: Deck_IF, oldCard: Card_IF): Promise<void> => {
  
  const newCards: Card_IF[] = deck['cards'].filter( (card) => {
    return card['id'] !== oldCard['id']
  })

  await pushDeckToStorage(deck, newCards)
  console.log(`Removed ${oldCard['card_text']['face_text']} from ${deck['name']}.`)
}
