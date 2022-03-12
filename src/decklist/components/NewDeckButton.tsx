import { useState } from 'react'

interface Props {
  addDeck: (deckName: string) => void
}

type ButtonState = Readonly<'inactive' | 'active'>

export const NewDeckButton = ({ addDeck }: Props) => {
  const [buttonState, setButtonState] = useState<ButtonState>('inactive')

  const enterNewDeckName = () => {
    setButtonState('active')
  }

  const submitNewDeck = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const deckName = event.currentTarget['deck_name'].value
    // if not only space, tab, linebreak
    if (!deckName.trim()) return

    addDeck(deckName)
    setButtonState('inactive')
  }

  return buttonState === 'active' ? (
    <div className={'new-deck-button new-deck-button-enter'}>
      <form
        onSubmit={(event) => submitNewDeck(event)}
        className={'new-deck-button-form'}
      >
        <label htmlFor={'deck_name'} />

        <input
          type={'text'}
          autoComplete={'off'}
          className={'form-input-new-deck'}
          name={'deck_name'}
        />

        <input
          className={'form-submit-new-deck'}
          type={'submit'}
          value={'Add Deck'}
        />
      </form>

      <div
        className={'new-deck-cancel'}
        onClick={() => setButtonState('inactive')}
      >
        {'Cancel'}
      </div>
    </div>
  ) : (
    <div
      className={'new-deck-button new-deck-button-click'}
      onClick={() => enterNewDeckName()}
    >
      {'Add Deck'}
    </div>
  )
}
