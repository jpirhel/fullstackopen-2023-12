import { useState } from 'react'

const Number = ({person}) => {
    const {name, number} = person;

    return (<>{name} {number}<br/></>);
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ]);

    const [newName, setNewName] = useState('');

    const [newNumber, setNewNumber] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const alreadyPresent = persons.find((elem) => elem.name === newName) != null;

        if (alreadyPresent) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = {name: newName, number: newNumber};

        const newPersons = persons.concat(newPerson);

        setPersons(newPersons);
    };

    const handleOnChangeName = (event) => {
        const value = event.target.value;
        setNewName(value);
    };

    const handleOnChangeNumber = (event) => {
        const value = event.target.value;
        setNewNumber(value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    name: <input onChange={handleOnChangeName} value={newName}/>
                </div>
                <div>
                    number: <input onChange={handleOnChangeNumber} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <Number key={person.name} person={person} />)}
        </div>
    );
}
export default App
