import _ from "lodash";

import axios from 'axios'

const serverUrl = (path) => {
    // const baseUrl = "http://localhost:3003";
    const baseUrl = "";
    return `${baseUrl}${path}`;
}

const defaultHeaders = (user) => {
    // noinspection UnnecessaryLocalVariableJS
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
    };

    return headers;
}

const getAll = () => {
    const getUrl = serverUrl("/api/blogs");

    console.log("blogService.getAll getUrl:", getUrl);

    const request = axios.get(getUrl)

    return request.then(response => response.data)
}

const postNew = async (user, title, author, url) => {
    const postUrl = serverUrl("/api/blogs");

    const userId = user.id;

    const data = {user: userId, title, author, url};

    const headers = defaultHeaders(user);

    let result;

    try {
        result = await axios.post(postUrl, data, {headers});
    } catch (e) {
        return null;
    }

    return result;
}

const addLike = async (user, blog) => {
    const putUrl = serverUrl(`/api/blogs/${blog.id}`);
    console.log("blogService.addUrl putUrl:", putUrl);

    const newBlog = _.cloneDeep(blog);

    // NOTE this is a bit of an ugly hack to transform the id:s back to _id:s

    newBlog._id = newBlog.id;
    delete newBlog.id;

    newBlog.user._id = newBlog.user.id;
    delete newBlog.user.id;

    // add a like
    newBlog.likes = newBlog.likes + 1;

    console.log("blogService.addLike newBlog:", newBlog);

    const headers = defaultHeaders(user);

    const data = newBlog;

    let result;

    try {
        result = await axios.put(putUrl, data, {headers});
    } catch (e) {
        console.log("Failed to add like, error:", e);
        return null;
    }

    return result;
}

const deleteBlog = async (user, blog) => {
    console.log("blogService.deleteBlog blog:", blog);

    const deleteUrl = serverUrl(`/api/blogs/${blog.id}`);
    console.log("blogService.addUrl deleteUrl:", deleteUrl);

    const headers = defaultHeaders(user);

    let result;

    try {
        result = await axios.delete(deleteUrl, {headers});
    } catch (e) {
        console.log("Failed to add like, error:", e);
        return null;
    }

    return result;
}

export default {getAll, postNew, addLike, deleteBlog};
