import DeleteIcon from '@mui/icons-material/Delete'
/* eslint react/forbid-component-props: 0 */

interface Props {
  deckInfoItem: DeckInfo
  onClick: () => void
  deleteDeck: (deckId: string) => Promise<void>
}

interface DeleteDeckButtonProps {
  onClick: (event: React.MouseEvent) => void
}

const DeleteDeckButton = ({ onClick }: DeleteDeckButtonProps) => {
  return (
    <DeleteIcon
      sx={{ fontSize: '1.5rem' }}
      className={'decklist-item-button decklist-item-delete-deck-button'}
      onClick={onClick}
    />
  )
}

export const DeckListItem = ({ deckInfoItem, onClick, deleteDeck }: Props) => {
  return (
    <div className={'decklist-item'} onClick={onClick}>
      <p className={'decklist-item-name'}>{deckInfoItem['name']}</p>

      <div className={'decklist-item-options'}>
        <DeleteDeckButton
          onClick={(event) => {
            event.stopPropagation()
            deleteDeck(deckInfoItem['id_deck'])
          }}
        />
      </div>

      <div className={'decklist-item-review'}>
        {deckInfoItem['review_count']}
      </div>
    </div>
  )
}
