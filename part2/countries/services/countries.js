import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

export const getAll = () => {
    const url = `${baseUrl}/api/all`;
    return axios.get(url);
}
