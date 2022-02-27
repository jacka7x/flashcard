
interface Props {
  deckInfoItem: DeckInfo
  onClick: () => void
}

export const DeckListItem = ({ deckInfoItem, onClick }: Props) => {
  return (
    <div
      className={'decklist-item'}
      onClick={onClick}
    >
      <p className={'decklist-item-name'}>
        {deckInfoItem['name']}
      </p>

      <div className={'decklist-item-review'}>
        {deckInfoItem['review_count']}
      </div>
    </div>
  )
}
