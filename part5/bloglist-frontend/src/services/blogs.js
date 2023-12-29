import axios from 'axios'

const serverUrl = (path) => {
    // const baseUrl = "http://localhost:3003";
    const baseUrl = "";
    return `${baseUrl}${path}`;
}

const getAll = () => {
    const getUrl = serverUrl("/api/blogs");

    console.log("blogService.getAll getUrl:", getUrl);

    const request = axios.get(getUrl)

    return request.then(response => response.data)
}

const postNew = async (user, title, author, url) => {
    const postUrl = serverUrl("/api/blogs");

    const data = {user, title, author, url};

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
    };

    let result;

    try {
        result = await axios.post(postUrl, data, {headers});
    } catch (e) {
        return null;
    }

    return result;
}

export default {getAll, postNew};
