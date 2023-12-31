import _ from "lodash";

import Blog from "./Blog.jsx";

const BlogList = (props) => {
    const blogs = _.get(props, "blogs") || [];

    const sortedBlogs = _.reverse(_.sortBy(blogs, (blog) => blog.likes));

    return (
        <>
            {sortedBlogs.map(blog => <Blog
                key={blog.id}
                blog={blog}
                user={props.user}
                refresh={props.refresh}/>
            )}
        </>
    );
}

export default BlogList;
