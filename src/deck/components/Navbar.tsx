// import { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

/* eslint react/forbid-component-props: 0 */

interface Props {
  workingDeck: Deck_IF
  reviewPile: Card_IF[]
  reviewCount: number
  goToSelectDeck: () => void
  deleteCardFromDeck: (card_id: string, deck_id: string) => Promise<void>
  openPopup: (popupType: Popups) => void
}

interface SelectDeckButtonProps {
  workingDeck: Deck_IF
  onClick: () => void
}

interface AddCardButtonProps {
  onMouseUp: () => void
}

interface DeleteCardButtonProps {
  reviewPile: Card_IF[]
  workingDeck: Deck_IF
  deleteCardFromDeck: (card_id: string, deck_id: string) => Promise<void>
}

const SelectDeckButton = ({ workingDeck, onClick }: SelectDeckButtonProps) => {
  return (
    <div className={'nav-review-deck'} onClick={onClick}>
      {workingDeck['name']}
    </div>
  )
}

const AddCardButton = ({ onMouseUp }: AddCardButtonProps) => {
  return (
    <AddIcon
      sx={{ fontSize: '2.4rem' }}
      className={'nav-button nav-add-card-button'}
      onMouseUp={onMouseUp}
    />
  )
}

const DeleteCardButton = ({
  reviewPile,
  workingDeck,
  deleteCardFromDeck
}: DeleteCardButtonProps) => {
  return (
    <DeleteIcon
      sx={{ fontSize: '2rem' }}
      className={'nav-button nav-delete-card-button'}
      onMouseUp={() => {
        if (reviewPile[0]) {
          const card_id = reviewPile[0].id_card
          const deck_id = workingDeck.id_deck
          deleteCardFromDeck(card_id, deck_id)
        } else {
          console.error('No card to delete.')
        }
      }}
    />
  )
}

export const Navbar = ({
  workingDeck,
  reviewPile,
  reviewCount,
  goToSelectDeck,
  deleteCardFromDeck,
  openPopup
}: Props) => {
  return (
    <div className={'navbar'}>
      <SelectDeckButton workingDeck={workingDeck} onClick={goToSelectDeck} />

      <p className={'nav-review-count'}>{reviewCount}</p>

      <div className={'nav-button-container'}>
        <AddCardButton onMouseUp={() => openPopup('addCard')} />

        <DeleteCardButton
          deleteCardFromDeck={deleteCardFromDeck}
          reviewPile={reviewPile}
          workingDeck={workingDeck}
        />
      </div>
    </div>
  )
}
