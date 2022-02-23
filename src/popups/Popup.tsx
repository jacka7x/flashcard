
import { AddCardForm } from './components/AddCardForm'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  deck: Deck_IF | undefined
  popupType: Popups
  closePopup: () => void
  addCard: (deck: Deck_IF, newCardText: Card_Text) => Promise<void>
}

interface CloseButtonProps {
  onMouseUp: () => void
}

const CloseButton = ( {onMouseUp}: CloseButtonProps ) => {
  return <CloseIcon sx={{fontSize: '1.4rem'}}
    className="close-popup"
    onMouseUp={onMouseUp}>
  </CloseIcon>
}

export const Popup = ( {deck, popupType, closePopup, addCard}: Props ) => {

  return <div className='popup' onMouseUp={() => closePopup()}>
      <div className='popup-container'>
        <CloseButton
          onMouseUp={() => closePopup()}
        ></CloseButton>
        {
          popupType === 'addCard' ? 
            <AddCardForm
              deck={deck}
              addCard={addCard}
            ></AddCardForm> : ''
        }
      </div>  
    </div>
}
  