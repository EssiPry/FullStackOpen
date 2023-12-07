import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterUsed, setFilterUsed] = useState('')

  const addPerson = (event) => {
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

  const personsToShow = filterUsed
    ? persons.filter(person => person.name.toLowerCase().includes(filterUsed.toLowerCase()))
    : persons

  const handleAddName = (event) => {
    //console.log('handle add name', event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    //console.log('handle new number', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    //console.log('handle filter', event.target.value)
    setFilterUsed(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>

    </div>
  )

}

export default App
