import {useEffect, useState} from 'react'

import {
    deletePerson,
    fetchInitialData,
    changePerson,
    postNewPerson,
} from './services/phonebook.js';

import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import PhoneNumberList from "./components/PhoneNumberList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');

    const [newNumber, setNewNumber] = useState('');

    const [filter, setFilter] = useState('');

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const initialDataFetcher = () => {
        const fetched = fetchInitialData();

        fetched.then((response) => {
            setPersons(response.data);
        });
    }

    useEffect(initialDataFetcher, []);

    const displayNotification = (message, notificationType) => {
        const timeout = 5000; // milliseconds

        switch (notificationType) {
            case "error":
                setErrorMessage(message);

                setTimeout(() => {
                    setErrorMessage("");
                }, timeout);
                break;
            case "success":
                // fall through
            default:
                setSuccessMessage(message);

                setTimeout(() => {
                    setSuccessMessage("");
                }, timeout);
                break;
        }
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const foundPerson = persons.find((elem) => elem.name === newName);
        const alreadyPresent = foundPerson != null;

        if (alreadyPresent) {
            handleOnChangePersonNumber(foundPerson);
            return;
        }

        const newPerson = {name: newName, number: newNumber};

        // save new person to the server

        const newPersonPosted = (response) => {
            const serverStoredPerson = response.data;
            const newPersons = persons.concat(serverStoredPerson);
            setPersons(newPersons);

            displayNotification(`Added ${serverStoredPerson.name}`);
        };

        const posted = postNewPerson(newPerson);
        posted.then(newPersonPosted);
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

    const handleDeletePerson = (person) => {
        const handled = deletePerson(person.id);

        handled
            .then(() => {
                const newPersons = persons.filter((p) => p.id !== person.id);
                setPersons(newPersons);
            })
            .catch(() => {
                const message = `Information of ${person.name} has already been removed from server`
                displayNotification(message, "error");

                // FIXME duplicated code

                // remove deleted person from local state

                const newPersons = persons.filter(p => p.id !== person.id);
                setPersons(newPersons);
            });
    }

    const handleOnDeletePerson = (person) => {
        const message = `Delete ${person.name}?`;

        if (window.confirm(message)) {
            handleDeletePerson(person);
        }
    }

    const handleOnChangePersonNumber = (person) => {
        const message = `${newName} is already added to the phonebook, replace the old number with a new one?`;

        if (window.confirm(message)) {
            const newPerson = {...person};
            newPerson.number = newNumber;

            const handled = changePerson(newPerson);

            handled
                .then(() => {
                    // add changed person to local state
                    const newPersons = persons.map(p => p.id !== person.id ? p : newPerson);
                    setPersons(newPersons);

                    const message = `Changed the number for ${newPerson.name}`;
                    displayNotification(message);
                })
                .catch(() => {
                    const message = `Information of ${person.name} has already been removed from server`;
                    displayNotification(message, "error");

                    // FIXME duplicated code

                    // remove deleted person from local state

                    const newPersons = persons.filter(p => p.id !== person.id);
                    setPersons(newPersons);
                });
        }
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
            <Notification message={errorMessage} notificationType="error"/>
            <Notification message={successMessage} notificationType="success"/>
            <Filter handler={handleOnChangeFilter} filter={filter}/>
            <h3>add a new</h3>
            <AddPersonForm
                handleSubmit={handleOnSubmit}
                handleName={handleOnChangeName}
                handleNumber={handleOnChangeNumber}
                name={newName}
                number={newNumber}/>
            <h3>Numbers</h3>
            <PhoneNumberList
                persons={filteredPersons}
                deleteHandler={handleOnDeletePerson}/>
        </div>
    );
}
export default App
