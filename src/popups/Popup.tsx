
import { AddCardForm } from './components/AddCardForm'

interface Props {
  deck: Deck_IF | undefined
  popupType: Popups
  closePopup: () => void
  addCard: (deck: Deck_IF, newCardText: Card_Text) => Promise<void>
}

export const Popup = ( {deck, popupType, closePopup, addCard}: Props ) => {

  return <div className='popup' onMouseUp={() => closePopup()}>
      {
        popupType === 'addCard' ? 
          <AddCardForm
            deck={deck}
            closePopup={closePopup}
            addCard={addCard}
          ></AddCardForm> : ''
      }
    </div>
}
  