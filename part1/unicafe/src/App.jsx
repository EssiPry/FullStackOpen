import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={props.total}/>
          <StatisticLine text="average" value={props.average}/>
          <StatisticLine text="positive" value={props.positive} percent="%"/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.percent}</td>
    </tr>
  )
}

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

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={good + neutral + bad}
        average={(good *1 + neutral *0 + bad * -1) /(good + neutral + bad)}
        positive={good/(good + neutral + bad)*100}/>
    </div>
  )
}

export default App
