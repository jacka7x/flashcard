
interface Props {
    deck: Deck_IF | undefined
    closePopup: () => void;
    addCard: (deck: Deck_IF, newCardText: Card_Text) => Promise<void>
  }
  
  export const AddCardForm = ( {deck, closePopup, addCard}: Props ) => {

    const submitNewCard = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        const newCardText: Card_Text = {
            face_text: event.currentTarget['front_text'].value,
            back_text: event.currentTarget['back_text'].value
        }

        if (deck) {
            addCard(deck, newCardText)
            console.log(`Submitted ${newCardText['face_text']}`)
        } else {
            console.log('No current deck')
        }
    }

    return <div className='add-card-form'
                onMouseUp={(event) => event.stopPropagation()}>

            <div className='form-container'>
                <h2 className='form-title'>Add new card</h2>

                <form onSubmit={(event) => submitNewCard(event)}>
                    <label
                        className='form-label'
                        htmlFor='front_text'
                    >Front</label>
                    <textarea 
                        className='form-input'
                        name='front_text'
                    />

                    <label
                        className='form-label'
                        htmlFor='back_text'
                    >Back</label>
                    <textarea
                        className='form-input'
                        name='back_text'
                    />

                    <input
                        className='form-submit'
                        type='submit'
                        value='Add Card'
                    />
                </form>
            </div>
    </div>
  }
    