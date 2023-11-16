import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (
  <div>
    <p>{props.good} {props.goodNumber}</p>
    <p>{props.neutral} {props.neutralNumber}</p>
    <p>{props.bad} {props.badNumber}</p>
    <p>{props.all} {props.total}</p>
    <p>{props.ave} {props.average}</p>
    <p>{props.pos} {props.positive} % </p>
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good +1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral +1)
  }
  const handleClickBad = () => {
    setBad(bad +1)
  }

  return (
    <div>
      <h2>give feedback</h2>

      <Button handleClick={handleClickGood} text="good"/>
      <Button handleClick={handleClickNeutral} text="neutral"/>
      <Button handleClick={handleClickBad} text="bad"/>

      <h2>statistics</h2>

      <Statistics good="good" goodNumber={good}
      neutral="neutral" neutralNumber={neutral}
      bad="bad" badNumber={bad}
      all="all" total={good + neutral + bad}
      ave="average" average={(good *1 + neutral *0 + bad * -1) /(good + neutral + bad)}
      pos="positive" positive={good/(good + neutral + bad)*100}/>
    </div>
  )
}

export default App
