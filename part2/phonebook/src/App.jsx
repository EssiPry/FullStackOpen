import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    console.log('add name', newName)
    console.log('add number', newNumber)
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject =  {
          name: newName,
          number: newNumber
        }

    setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleAddName = (event) => {
    console.log('handle add name', event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber =(event) => {
    console.log('handle new number', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value ={newName} onChange={handleAddName}/>
        </div>
        <div>phone number: <input value={newNumber} onChange={handleAddNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}> {person.name} {person.number}</p>)}
    </div>
  )

}

export default App
