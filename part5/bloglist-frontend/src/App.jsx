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

const LogoutForm = ({onSubmit}) => {
    return (
        <div>
            <hr/>
            <button type="button" onClick={onSubmit}>logout</button>
        </div>
    )
}

const App = () => {
    const [ready, setReady] = useState(false);

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    // NOTE changed to depend on user, so blogs will be fetched after the user logs in
    useEffect(() => {
        getAllBlogs();
    }, [user])

    useEffect(() => {
        const storedUser = window.localStorage.getItem("user");

        if (!_.isEmpty(storedUser)) {
            setUser(storedUser);
        }

        setReady(true);
    }, []);

    const login = async (username, password) => {
        const result = await loginService.login(username, password);
        setUser(result);
        window.localStorage.setItem("user", result);
    }

    const logout = () => {
        window.localStorage.removeItem("user");
        setUser(null);
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

    const onSubmitLogin = (event) => {
        event.preventDefault();
        login(username, password);
    };

    const onSubmitLogout = (event) => {
        event.preventDefault();
        logout();
    }
    const onChangeUsername = (data) => {
        setUsername(data);
    };

    const onChangePassword = (data) => {
        setPassword(data);
    };

    const renderLoginForm = ! user && ready;

    return (
        <div>
            {user && <BlogList blogs={blogs}/>}
            {renderLoginForm &&
                <LoginForm
                    username={username || ""}
                    onSubmit={onSubmitLogin}
                    onChangeUsername={onChangeUsername}
                    onChangePassword={onChangePassword}/>}
            {user && <LogoutForm onSubmit={onSubmitLogout}/>}
</div>
)
    ;
}

export default App;
