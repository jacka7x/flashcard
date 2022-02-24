
interface Props {
  deck: Deck_IF
  onClick: () => void
}

export const DeckListItem = ( { deck, onClick }: Props ) => {
  return <div className='decklist-item' onClick={onClick}>
    {deck['name']}
  </div>
}
