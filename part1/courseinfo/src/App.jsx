const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
  }
const Content = (props) =>{
  console.log(props)
  return(
    <>
      <Part part={props.parts[0]} exercises={props.exercises[0]}/>
      <Part part={props.parts[1]} exercises={props.exercises[1]}/>
      <Part part={props.parts[2]} exercises={props.exercises[2]}/>
    </>
  )
}

const Total = (props) =>{
  return(
    <p>Number of exercises {props.total}</p>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
    <p>{props.part} {props.exercises}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total total={exercises[0] + exercises[1] + exercises[2]}/>
    </div>
  )
}

export default App