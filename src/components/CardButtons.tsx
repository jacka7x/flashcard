
interface ShowProps {
    onMouseUp: () => void
}

interface AnswerProps {
  onMouseUp: () => void
}

interface ButtonsProps {
  state: CardState
  onMouseUp: () => void
  answer: (answer: Answer) => void
}

const ShowButton = ({onMouseUp}: ShowProps) => {
  return <div className='show-button' onMouseUp={onMouseUp}>
      <p>Show Answer</p>
  </div>
}

const RightButton = ({onMouseUp}: AnswerProps) => {
  return <div className='answer-button right-button' onMouseUp={onMouseUp}>
      <p>Right</p>
  </div>
}
const WrongButton = ({onMouseUp}: AnswerProps) => {
  return <div className=' answer-button wrong-button' onMouseUp={onMouseUp}>
      <p>Wrong</p>
  </div>
}

export const CardButtons= ( 
  { state, onMouseUp, answer }: ButtonsProps) => {
  return <div className='card-buttons'>
      {
        state === 'front' ?
          <ShowButton onMouseUp={onMouseUp}></ShowButton> :
          <div className='answer-buttons'>
            <RightButton onMouseUp={() => answer('right')}></RightButton>
            <div className='answer-button-seperator'></div>
            <WrongButton onMouseUp={() => answer('wrong')}></WrongButton>
          </div>
      }
      
    </div>
}