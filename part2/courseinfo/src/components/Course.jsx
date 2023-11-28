const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Content = (props) => {
    //console.log('content', props)
    return(
        <>
        <Part parts={props.course.parts} />
        <Total parts={props.course.parts}/>
        </>
    )
}

const Part = (props) => {
    //console.log('part', props)
    return(
        <div>
        {props.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        </div>
    )
}

const Total = (props) => {
    //console.log('total', props)
    const total = props.parts.reduce(
        (sum, part) =>
        sum + part.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
      </div>
    )
  }

export default Course