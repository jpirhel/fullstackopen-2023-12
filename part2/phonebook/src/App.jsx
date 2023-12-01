import { useState } from 'react'

const Number = ({person}) => {
    const {name} = person;

    return (
        <p>{name}</p>
    );
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const newPerson = {name: newName};

        const newPersons = persons.concat(newPerson);

        setPersons(newPersons);
    };

    const handleOnChange = (event) => {
        const value = event.target.value;
        setNewName(value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    name: <input onChange={handleOnChange}/>
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
