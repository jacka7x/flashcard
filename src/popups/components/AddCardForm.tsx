interface Props {
  deck: Deck_IF | null
  addDeckCard: (newCard: Card_Text, deckId: string) => Promise<void>
}

export const AddCardForm = ({ deck, addDeckCard }: Props) => {
  const submitNewCard = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    const newCardText: Card_Text = {
      face_text: event.currentTarget['front_text'].value,
      back_text: event.currentTarget['back_text'].value
    }

    try {
      if (!deck) throw new Error('No current deck selected')
      await addDeckCard(newCardText, deck['id_deck'])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className={'add-card-form'}
      onMouseUp={(event) => event.stopPropagation()}
    >
      <div className={'form-container'}>
        <h2 className={'form-title'}>{'Add new card'}</h2>

        <form onSubmit={(event) => submitNewCard(event)}>
          <label className={'form-label'} htmlFor={'front_text'}>
            {'Front'}
          </label>

          <textarea className={'form-input'} name={'front_text'} />

          <label className={'form-label'} htmlFor={'back_text'}>
            {'Back'}
          </label>

          <textarea className={'form-input'} name={'back_text'} />

          <input className={'form-submit'} type={'submit'} value={'Add Card'} />
        </form>
      </div>
    </div>
  )
}
