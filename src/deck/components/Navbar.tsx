
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
  return <AddIcon sx={{fontSize: '2.4rem'}}
    className="nav-button nav-add-card-button"
    onMouseUp={onMouseUp}>
  </AddIcon>
}

const DeleteCardButton = ( {onMouseUp}: AddCardButtonProps ) => {
  return <DeleteIcon sx={{fontSize: '2rem'}}
    className="nav-button nav-delete-card-button"
    onMouseUp={onMouseUp}>
  </DeleteIcon>
}

export const Navbar = ( 
  {workingDeck, reviewDeck, reviewCount,
     deleteCard, openPopup}: Props ) => {

  return <div className='navbar'>
      {/* MAKE INTO COMPONENT + CONTAINER*/}
      <p className='nav-review-deck'>{workingDeck['name']}</p>
      <p className='nav-review-count'>{reviewCount}</p>
      
      {/* MAKE CONTAINER ? */}
      <div className='nav-button-container'>
        <AddCardButton 
          onMouseUp={() => openPopup('addCard')}
        ></AddCardButton>
        <DeleteCardButton 
          onMouseUp={() => deleteCard(workingDeck, reviewDeck[0])}
        ></DeleteCardButton>
      </div>
      
    </div>
}