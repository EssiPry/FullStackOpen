
const PersonForm = ({addPerson, newName, handleAddName, newNumber, handleAddNumber}) => {
    return (
    <form onSubmit={addPerson}>
        <div>name: <input value ={newName} onChange={(e) => handleAddName(e)}/>
        </div>
        <div>phone number: <input value={newNumber} onChange={(e) => handleAddNumber(e)}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm