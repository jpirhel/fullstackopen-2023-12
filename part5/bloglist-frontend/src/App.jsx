import _ from "lodash";

import {useState, useEffect} from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const BlogList = (props) => {
    const blogs = _.get(props, "blogs") || [];

    return (
        <>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </>
    );
}

const LoginForm = ({
                       username,
                       password,
                       onSubmit,
                       onChangeUsername,
                       onChangePassword
                   }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>log in to application</h2>
            <div>
                <label htmlFor="Username">Username</label><br/>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => onChangeUsername(target.value)}
                />
            </div>
            <div>
                <label htmlFor="Password">Password</label><br/>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => onChangePassword(target.value)}
                />
            </div>
            <hr/>
            <button type="submit">login</button>
        </form>
    )
}
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const login = async (username, password) => {
        const result = await loginService.login(username, password);
        setUser(result);
    }

    const getAllBlogs = () => {
        async function fetchData() {

            const blogs = await blogService.getAll();

            if (!_.isEmpty(blogs)) {
                setBlogs(blogs);
            }
        }

        if (user == null) {
            return;
        }

        fetchData();
    }

    // NOTE changed to depend on user, so blogs will be fetched after the user logs in
    useEffect(() => {
        getAllBlogs();
    }, [user])

    const onSubmit = (event) => {
        event.preventDefault();
        login(username, password);
    };

    const onChangeUsername = (data) => {
        setUsername(data);
    };

    const onChangePassword = (data) => {
        setPassword(data);
    };

    return (
        <div>
            {user
                ? <BlogList blogs={blogs}/>
                : <LoginForm
                    username={username || ""}
                    onSubmit={onSubmit}
                    onChangeUsername={onChangeUsername}
                    onChangePassword={onChangePassword}
                />
            }
        </div>
    );
}

export default App;
