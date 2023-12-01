import {useState} from 'react'

import Filter from "./components/Filter.jsx";
import PhoneNumberList from "./components/PhoneNumberList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-1234567'}
    ]);

    const [newName, setNewName] = useState('');

    const [newNumber, setNewNumber] = useState('');

    const [filter, setFilter] = useState('');

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

    const handleOnChangeFilter = (event) => {
        const value = event.target.value;
        setFilter(value);
    }

    const filteredPersons = filter !== ''
        ? persons.filter(
            (person) => person.name
                .toLowerCase()
                .indexOf(filter.toLowerCase()) !== -1)
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handler={handleOnChangeFilter} filter={filter}/>
            <h3>add a new</h3>
            <AddPersonForm
                handleSubmit={handleOnSubmit}
                handleName={handleOnChangeName}
                handleNumber={handleOnChangeNumber}
                name={newName}
                number={newNumber}/>
            <h3>Numbers</h3>
            <PhoneNumberList persons={filteredPersons}/>
        </div>
    );
}
export default App
