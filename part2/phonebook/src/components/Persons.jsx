const Persons = ({persons, handleDelete}) => {
    console.log(persons)
    return <>
        {persons.map((person) => (
            <p key={person.name}>
                {person.name} {person.number}
                <button onClick={()=> handleDelete(person.name, person.id)}>
                 delete
                </button>
            </p>
            ))}
            </>
}

export default Persons