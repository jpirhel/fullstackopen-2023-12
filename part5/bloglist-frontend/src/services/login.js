import _ from "lodash";
import axios from "axios";

const url = (path) => {
    // const baseUrl = "http://localhost:3003";
    const baseUrl = "";
    return `${baseUrl}${path}`;
}

const login = async (username, password) => {
    const data = {username, password};

    const postUrl = url("/api/login");

    console.log("loginService.login postUrl:", postUrl);

    let result;

    try {
        result = await axios.post(postUrl, data);
    } catch (e) {
        return null;
    }

    // noinspection UnnecessaryLocalVariableJS
    const userData = _.get(result, "data");

    return userData;
}

export default {
    login,
}
