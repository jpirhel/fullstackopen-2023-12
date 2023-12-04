import {useEffect, useState} from 'react'

import axios from "axios";

import Filter from "./components/Filter.jsx";
import PhoneNumberList from "./components/PhoneNumberList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');

    const [newNumber, setNewNumber] = useState('');

    const [filter, setFilter] = useState('');

    const serverUrl = "http://localhost:3001/persons";

    const fetchInitialData = () => {
        // noinspection UnnecessaryLocalVariableJS
        const dataUrl = serverUrl;

        axios
            .get(dataUrl)
            .then(response => {
                setPersons(response.data);
            });
    }

    // NOTE:
    // This could lead to a race condition. The fetched "initial" state is not really initial;
    // the 'persons' state variable is initialised to [] and later overwritten by the data
    // fetched by the effect. What if the user manages to change the persons state variable
    // before the data fetching finishes running? The changes would be lost.

    useEffect(fetchInitialData, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const alreadyPresent = persons.find((elem) => elem.name === newName) != null;

        if (alreadyPresent) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const submitUrl = `${serverUrl}`

        const newPerson = {name: newName, number: newNumber};

        // save new person to the server

        axios.post(submitUrl, newPerson).then(response => {
            // update persons stored in state

            const serverStoredPerson = response.data;

            const newPersons = persons.concat(serverStoredPerson);

            setPersons(newPersons);
        })
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
