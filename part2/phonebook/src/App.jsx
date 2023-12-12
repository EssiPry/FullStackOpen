import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterUsed, setFilterUsed] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })

  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('add name', newName)
    //console.log('add number', newNumber)
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject =  {
          name: newName,
          number: newNumber
        }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
        })

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
