import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterUsed, setFilterUsed] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({text:'', type:''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
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
      if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)){
        const id = persons.find(p => p.name === newName).id
        personService
        .updatePerson(id, personObject)
        .then(updatedPersons => {
          setPersons(persons.map(person => person.id !== id ? person : updatedPersons))
          setNewName('')
          setNewNumber('')
          setNotificationMessage({text:`${newName}'s number was updated.`, type:'success'})
          setTimeout(() => {
            setNotificationMessage({text:'', type:''})}, 3000)
        })
        .catch(error => {
          setNotificationMessage({text:`${newName}'s number was not updated.`, type: 'error'})
          setTimeout(() => {
            setNotificationMessage({text:'', type:''})}, 3000)
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else{
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage({text:`${newName} was added to the phonebook.`, type: 'success'})
          setTimeout(() => {
            setNotificationMessage({text:'', type:''})}, 3000)
        })
        .catch(error => {
          //console.log(error.response.data)
          setNotificationMessage({text:`${error.response.data.error}`, type: 'error'})
          setTimeout(() => {
            setNotificationMessage({text:'', type:''})}, 3000)
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
      personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage({text:`${name} was deleted from the phonebook.`, type:'success'})
        setTimeout(() => {
          setNotificationMessage({text:'', type:''})}, 3000)
      })
      .catch(error => {
        setNotificationMessage({text:`${name} has already been deleted from the phonebook.`, type: 'error'})
        setTimeout(() => {
          setNotificationMessage({text:'', type:''})}, 3000)
        console.log(error)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage}/>

      <Filter handleFilter={handleFilter}/>

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddNumber={handleAddNumber}/>

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDeletePerson}/>

    </div>
  )
}

export default App
