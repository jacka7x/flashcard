
import { DeckListItem } from './components/DeckListItem'
import { NewDeckButton } from './components/NewDeckButton'

// Change this to new type DeckListData -> update and pass from app
interface Props {
  allDecks: Deck_IF[] | undefined
  selectDeck: (deckId: string) => void
}

export const Decklist = ( { allDecks, selectDeck }: Props ) => {
  return <div className='decklist'>
    <h1 className='decklist-title'>Select Deck</h1>
    <div className='decklist-list'>
      {
        testDecks.map( (deckItem, i) => <DeckListItem
          deck={deckItem} key = {i}
          onClick={() => selectDeck(deckItem['id'])}
        ></DeckListItem>)
      }
    </div>
    <NewDeckButton></NewDeckButton>
  </div>
}

const testDecks: Deck_IF[] = [
  {
  name: 'test',
  id: '1123',
  cards: [
    {
      id: "3742314448",
      card_text: {
        face_text: "cat",
        back_text: "고양이"
      },
      review: {
        review_date: 1643889904482,
        spacing: 26891
      }
    }
  ]
  },
  {
    name: 'test_2',
    id: '2531',
    cards: [
      {
        id: "3742314448",
        card_text: {
          face_text: "cat",
          back_text: "고양이"
        },
        review: {
          review_date: 1643889904482,
          spacing: 26891
        }
      }
    ]
    }
]