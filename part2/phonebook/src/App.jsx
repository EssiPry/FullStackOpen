import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('add name', event.target)
    const personObject =  {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleAddName = (event) => {
    console.log('handle add name', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value ={newName} onChange={handleAddName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}> {person.name}</p>)}
    </div>
  )

}

export default App