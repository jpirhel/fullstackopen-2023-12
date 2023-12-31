import {useRef} from "react";

import Togglable from "./Togglable";

const Blog = ({blog}) => {
    const blogRef = useRef();

    const style = {
        border: "1px solid black",
        padding: 2,
        marginBottom: 2,
    };

    return (
        <div style={style}>
            <span>{blog.title} {blog.author}</span>
            <Togglable useSpan={true} buttonLabel="view" cancelLabel="hide" ref={blogRef}>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>likes {blog.likes}</div>
                <div>{blog.user.name}</div>
            </Togglable>
        </div>
    );
}
export default Blog;
