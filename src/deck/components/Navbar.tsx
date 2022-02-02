
interface Props {
  workingDeck: Deck_IF
  reviewDeck: Card_IF[]
  reviewCount: number
  deleteCard: (deck: Deck_IF, oldCard: Card_IF | undefined) => Promise<void>
  openPopup: (popupType: Popups) => void
}

interface AddCardButtonProps {
  onMouseUp: () => void
}

const AddCardButton = ( {onMouseUp}: AddCardButtonProps ) => {
  return <div className="add-card-button" onMouseUp={onMouseUp}>

  </div>
}

const DeleteCardButton = ( {onMouseUp}: AddCardButtonProps ) => {
  return <div className="delete-card-button" onMouseUp={onMouseUp}>

  </div>
}

export const Navbar = ( 
  {workingDeck, reviewDeck, reviewCount,
     deleteCard, openPopup}: Props ) => {

  return <div className='navbar'>
      <AddCardButton 
        onMouseUp={() => openPopup('addCard')}
      ></AddCardButton>
      <DeleteCardButton 
        onMouseUp={() => deleteCard(workingDeck, reviewDeck[0])}
      ></DeleteCardButton>
      <p className='review-count'>{reviewCount}</p>
    </div>
}