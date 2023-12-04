import axios from 'axios';

const serverUrl = "http://localhost:3001/persons";

export const fetchInitialData = () => {
    return axios.get(serverUrl)
}

export const postNewPerson = (newPerson) => {
    return axios.post(serverUrl, newPerson);
}

export const deletePerson = (personId) => {
    const deleteUrl = `${serverUrl}/${personId}`;
    return axios.delete(deleteUrl)
}

export const changePerson = (person) => {
    const changeUrl = `${serverUrl}/${person.id}`;
    return axios.put(changeUrl, person);
}
