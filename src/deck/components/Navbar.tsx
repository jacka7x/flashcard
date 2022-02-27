
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

/* eslint react/forbid-component-props: 0 */

interface Props {
  workingDeck: Deck_IF
  reviewPile: Card_IF[]
  reviewCount: number
  goToSelectDeck: () => void
  deleteCard: (deck: Deck_IF, oldCard: Card_IF | undefined) => Promise<void>
  openPopup: (popupType: Popups) => void
}

interface SelectDeckButtonProps {
  workingDeck: Deck_IF
  onClick: () => void
}

interface AddCardButtonProps {
  onMouseUp: () => void
}

const SelectDeckButton = ({workingDeck, onClick}: SelectDeckButtonProps) => {
  return (
    <div
      className={'nav-review-deck'}
      onClick={onClick}
    >
      {workingDeck['name']}
    </div>
  )
}

const AddCardButton = ({onMouseUp}: AddCardButtonProps) => {
  return (<AddIcon
    sx={{fontSize: '2.4rem'}}
    className={'nav-button nav-add-card-button'}
    onMouseUp={onMouseUp}
          />)
}

const DeleteCardButton = ({onMouseUp}: AddCardButtonProps) => {
  return (
    <DeleteIcon
      sx={{fontSize: '2rem'}}
      className={'nav-button nav-delete-card-button'}
      onMouseUp={onMouseUp}
    />
  )
}

export const Navbar = ({workingDeck, reviewPile, reviewCount,
  goToSelectDeck, deleteCard, openPopup}: Props) => {

  return (
    <div className={'navbar'}>
      <SelectDeckButton
        workingDeck={workingDeck}
        onClick={goToSelectDeck}
      />

      <p className={'nav-review-count'}>
        {reviewCount}
      </p>

      <div className={'nav-button-container'}>
        <AddCardButton
          onMouseUp={() => openPopup('addCard')}
        />

        <DeleteCardButton
          onMouseUp={() => deleteCard(workingDeck, reviewPile[0])}
        />
      </div>
    </div>
  )
}
