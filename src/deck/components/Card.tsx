interface Props {
  card: Card_IF
  cardFace: CardFace
}

export const Card = ({ card, cardFace }: Props) => {
  return (
    <div className={'card'}>
      <p className={'card-text face-text'}>{card.card_text['face_text']}</p>

      {cardFace === 'back' ? (
        <p className={'card-text back-text'}>{card.card_text['back_text']}</p>
      ) : (
        ''
      )}
    </div>
  )
}
