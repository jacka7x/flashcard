import { useState, useRef } from 'react'
import { 
  useOutsideClick
} from '../../../src/general/scripts/detectOutsideClick'

interface Props {
  addDeck: (deckName: string) => void
}

type ButtonState = Readonly<'inactive' | 'active'>

export const NewDeckButton = ({ addDeck }: Props) => {
  const [buttonState, setButtonState] = useState<ButtonState>('inactive')

  const closeButton = () => setButtonState('inactive')
  const openButton = () => setButtonState('active')

  const buttonWrapper = useRef(null)
  useOutsideClick(buttonWrapper, closeButton)

  

  const submitNewDeck = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const deckName = event.currentTarget['deck_name'].value
    // if not only space, tab, linebreak
    if (!deckName.trim()) return

    addDeck(deckName)
    closeButton()
  }

  return buttonState === 'active' ? (
    <div
      className={'new-deck-button new-deck-button-enter'}
      ref={buttonWrapper}
    >
      <form
        className={'new-deck-button-form'}
        onSubmit={(event) => submitNewDeck(event)}
      >
        <label htmlFor={'deck_name'} />

        <input
          type={'text'}
          autoComplete={'off'}
          className={'form-input-new-deck'}
          name={'deck_name'}
          autoFocus
        />

        <input
          className={'form-submit-new-deck'}
          type={'submit'}
          value={'Add Deck'}
        />
      </form>

      <div
        className={'new-deck-cancel'}
        onClick={() => closeButton()}
      >
        {'Cancel'}
      </div>
    </div>
  ) : (
    <div
      className={'new-deck-button new-deck-button-click'}
      onClick={() => openButton()}
    >
      {'Add Deck'}
    </div>
  )
}
