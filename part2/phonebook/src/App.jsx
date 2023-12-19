import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterUsed, setFilterUsed] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('add name', newName)
    //console.log('add number', newNumber)
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      const personObject =  {
          name: newName,
          number: newNumber
        }

        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
  }}

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

  const handleDeletePerson = (name, id) => {
    //console.log(`handle deleting ${name}`)
    if (window.confirm(`Are you sure you want to delete ${name}?`)){
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      console.log(`${name} was deleted successfully`)
      } else {
      console.log(`${name} was not deleted`)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDeletePerson}/>

    </div>
  )

}

export default App
