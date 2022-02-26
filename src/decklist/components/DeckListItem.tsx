
interface Props {
  deckInfoItem: DeckInfo
  onClick: () => void
}

export const DeckListItem = ( { deckInfoItem, onClick }: Props ) => {
  return <div className='decklist-item' onClick={onClick}>
    {deckInfoItem['name']}
  </div>
}
