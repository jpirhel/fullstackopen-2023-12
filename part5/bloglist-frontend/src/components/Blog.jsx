import _ from "lodash";

import {useRef, useState} from "react";

import Togglable from "./Togglable";

import blogService from "../services/blogs";

const Blog = ({blog, user, refresh}) => {
    const blogRef = useRef();

    const [likes, setLikes] = useState(blog.likes);

    const onHandleLike = async () => {
        try {
            await blogService.addLike(user, blog);

            setLikes(likes + 1);

            if (_.isFunction(refresh)) {
                refresh();
            }
        } catch (e) {
            console.log("Failed to add like, error:", e);
        }
    };

    const onHandleDelete = async () => {
        const message = `Remove blog ${blog.title} by ${blog.user.name}?`;

        if (window.confirm(message)) {
            await blogService.deleteBlog(user, blog);

            if (_.isFunction(refresh)) {
                refresh();
            }
        }
    };

    const style = {
        border: "1px solid black",
        padding: 2,
        marginBottom: 2,
    };

    const showRemoveButton =  _.get(blog, "user.username") === user.username;

    return (
        <div style={style}>
            <span>{blog.title} {blog.author}</span>
            <Togglable useSpan={true} buttonLabel="view" cancelLabel="hide" ref={blogRef}>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>likes {likes} <button onClick={() => onHandleLike()}>like</button></div>
                <div>{blog.user.name}</div>
                {showRemoveButton && <button onClick={() => onHandleDelete()}>remove</button>}
            </Togglable>
        </div>
    );
}
export default Blog;
