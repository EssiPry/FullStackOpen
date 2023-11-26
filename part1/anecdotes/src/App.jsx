import { useState } from 'react'

const Button = (props) => (
  <div>
    <button onClick={props.handleClick}>
      {props.text}
    </button>

  </div>
)

const Display = (props) => {
  if (props.voteCount === 1) {
    return (
      <div>
        <h2>{props.title}</h2>
        <p>{props.anecdote}</p>
        <p>has {props.voteCount} vote. </p>
      </div>
    )
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.anecdote}</p>
      <p>has {props.voteCount} votes.</p>
    </div>
  )

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [mostVoted, setMostVoted] = useState(0)

  const selectNew = () => {
    const newValue = Math.floor(Math.random() * anecdotes.length)
    setSelected(newValue)
  }

  const addVote = () => {
    const addedVotes = [...votes]
    addedVotes[selected] += 1
    setVotes(addedVotes)
    console.log('addedVotes', addedVotes[selected])
    console.log('Votes', votes[selected])
    checkMostVoted(addedVotes)
  }

  const checkMostVoted = (addedVotes) => {
    const max = Math.max(...addedVotes)
    console.log('max', max)
    setMostVoted(addedVotes.indexOf(max))
  }

  return (
    <div>
      <Display title={"Anecdote of the day"} anecdote={anecdotes[selected]} voteCount={votes[selected]}/>
      <Button handleClick={addVote} text="Vote"/>
      <Button handleClick={selectNew} text="Next anecdote" />
      <Display title={"Anecdote with most votes"} anecdote={anecdotes[mostVoted]} voteCount={votes[mostVoted]}/>


    </div>
  )
}

export default App
