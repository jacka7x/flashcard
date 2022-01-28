
interface Props {
  card: Card_IF
  state: CardState
}

export const Card = ( { card, state }: Props ) => {
  return <div className='card'>
      <p className='card-text face-text'>{card.card_text.faceText}</p>
      {
        state === 'back' ?
        <p className='card-text back-text'>{card.card_text.backText}</p> : ''
      }
    </div>
}
  
