
import { AddCardForm } from './components/AddCardForm'
import CloseIcon from '@mui/icons-material/Close'

/* eslint react/forbid-component-props: 0 */

interface Props {
  deck: Deck_IF | null
  popupType: Popups
  closePopup: () => void
  addCard: (deck: Deck_IF, newCardText: Card_Text) => Promise<void>
}

interface CloseButtonProps {
  onMouseUp: () => void
}

const CloseButton = ({onMouseUp}: CloseButtonProps) => {
  return (
    <CloseIcon
      sx={{fontSize: '1.4rem'}}
      className={'close-popup'}
      onMouseUp={onMouseUp}
    />
  )
}

export const Popup = ({deck, popupType, closePopup, addCard}: Props) => {

  return (
    <div
      className={'popup'}
      onMouseUp={() => closePopup()}
    >

      <div className={'popup-container'}>
        <CloseButton
          onMouseUp={() => closePopup()}
        />

        {
          popupType === 'addCard'
            ? <AddCardForm
                deck={deck}
                addCard={addCard}
              />
            : ''
        }
      </div>
    </div>
  )
}
