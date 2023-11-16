import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <div>{props.text} {props.number}
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

      <Display text="good" number={good}/>
      <Display text="neutral" number={neutral}/>
      <Display text="bad" number={bad}/>
    </div>
  )
}

export default App
