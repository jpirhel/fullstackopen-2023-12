import _ from "lodash";

import Blog from "./Blog.jsx";

const BlogList = (props) => {
    const blogs = _.get(props, "blogs") || [];

    return (
        <>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={props.user}/>
            )}
        </>
    );
}

export default BlogList;
