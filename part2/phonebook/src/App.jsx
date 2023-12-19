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

    const personObject =  {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)){
        const id = persons.find(p => p.name === newName).id
        personService
        .updatePerson(id, personObject)
        .then(updatedPersons => {
          setPersons(persons.map(person => person.id !== id ? person : updatedPersons))
          setNewName('')
          setNewNumber('')
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    }
    else{
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
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterUsed(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
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
