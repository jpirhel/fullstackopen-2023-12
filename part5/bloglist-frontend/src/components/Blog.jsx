import _ from "lodash";

import {useRef, useState} from "react";

import Togglable from "./Togglable";

import blogService from "../services/blogs";

const Blog = ({blog, user, onHandleLike, onHandleDelete}) => {
    const blogRef = useRef();

    const style = {
        border: "1px solid black",
        padding: 2,
        marginBottom: 2,
    };

    const showRemoveButton =  _.get(blog, "user.username") === user.username;

    const likes = _.get(blog, "likes", 0);

    return (
        <div style={style}>
            <span>{blog.title} {blog.author}</span>
            <Togglable useSpan={true} buttonLabel="view" cancelLabel="hide" ref={blogRef}>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>likes {likes} <button onClick={() => onHandleLike(blog)}>like</button></div>
                <div>{blog.user.name}</div>
                {showRemoveButton && <button onClick={() => onHandleDelete(blog)}>remove</button>}
            </Togglable>
        </div>
    );
}
export default Blog;
