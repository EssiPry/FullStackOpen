const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Content = (props) => {
    console.log(props)
    return(
        <>
        <Part parts={props.course.parts} />
        </>
    )
}

const Part = (props) => {
    console.log(props)
    return(
        <div>
        {props.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
        )}
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