import axios from 'axios';

const serverUrl = "http://localhost:3001/persons";

export const fetchInitialData = () => {
    return axios.get(serverUrl)
}

export const postNewPerson = (newPerson) => {
    return axios.post(serverUrl, newPerson);
}
