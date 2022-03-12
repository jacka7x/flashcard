interface ShowProps {
  onMouseUp: () => void
}

interface AnswerProps {
  onMouseUp: () => void
}

interface Props {
  reviewCount: number
  cardFace: CardFace
  showAnswer: () => void
  answer: (answer: Answer) => void
}

const ShowButton = ({ onMouseUp }: ShowProps) => {
  return (
    <div className={'show-button'} onMouseUp={onMouseUp}>
      <p>{'Show Answer'}</p>
    </div>
  )
}

const RightButton = ({ onMouseUp }: AnswerProps) => {
  return (
    <div className={'answer-button right-button'} onMouseUp={onMouseUp}>
      <p>{'Right'}</p>
    </div>
  )
}

const WrongButton = ({ onMouseUp }: AnswerProps) => {
  return (
    <div className={' answer-button wrong-button'} onMouseUp={onMouseUp}>
      <p>{'Wrong'}</p>
    </div>
  )
}

export const CardButtons = ({
  reviewCount,
  cardFace,
  showAnswer,
  answer
}: Props) => {
  return (
    <div className={'card-buttons'}>
      {reviewCount > 0 ? (
        cardFace === 'front' ? (
          <ShowButton onMouseUp={showAnswer} />
        ) : (
          <div className={'answer-buttons'}>
            <RightButton onMouseUp={() => answer('right')} />

            <div className={'answer-button-seperator'} />

            <WrongButton onMouseUp={() => answer('wrong')} />
          </div>
        )
      ) : (
        ''
      )}
    </div>
  )
}
