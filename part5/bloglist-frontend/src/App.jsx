import _ from "lodash";

import {useState, useEffect} from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const BlogList = (props) => {
    const blogs = _.get(props, "blogs") || [];
    const user = _.get(props, "user");

    const onSubmitLogout = _.get(props, "onSubmitLogout");
    const onSubmitCreate = _.get(props, "onSubmitCreate");

    const onChangeTitle = _.get(props, "onChangeTitle");
    const onChangeAuthor = _.get(props, "onChangeAuthor");
    const onChangeUrl = _.get(props, "onChangeUrl");

    return (
        <>
            {user.name} logged in
            <LogoutForm onSubmit={onSubmitLogout}/>
            {user && <CreateForm
                onSubmit={onSubmitCreate}
                onChangeTitle={onChangeTitle}
                onChangeAuthor={onChangeAuthor}
                onChangeUrl={onChangeUrl}
            />}
            <div>&nbsp;</div>
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
        <button type="button" onClick={onSubmit}>logout</button>
    )
}

const CreateForm = ({onSubmit, onChangeTitle, onChangeAuthor, onChangeUrl}) => {
    return (
        <div>
            <h2>create new</h2>
            <form>
                title: <input type="text" name="Title" onChange={({target}) => onChangeTitle(target.value)}/><br/>
                author: <input type="text" name="Author" onChange={({target}) =>onChangeAuthor(target.value)}/><br/>
                url: <input type="text" name="Url" onChange={({target}) => onChangeUrl(target.value)}/>
            </form>
            <button onClick={onSubmit}>create</button>
        </div>
    );
}
const App = () => {
    const [ready, setReady] = useState(false);

    const [blogs, setBlogs] = useState([])

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const [refreshBlogs, setRefreshBlogs] = useState(0);

    // NOTE changed to depend on user, so blogs will be fetched after the user logs in
    useEffect(() => {
        getAllBlogs();
    }, [user, refreshBlogs])

    useEffect(() => {
        const storedUserJSON = window.localStorage.getItem("user");

        const storedUser = JSON.parse(storedUserJSON);

        if (!_.isEmpty(storedUser)) {
            setUser(storedUser);
        }

        setReady(true);
    }, []);

    const login = async (username, password) => {
        const result = await loginService.login(username, password);
        setUser(result);
        window.localStorage.setItem("user", JSON.stringify(result));
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

    const onChangeTitle = (data) => {
        setTitle(data);
    }

    const onChangeAuthor = (data) => {
        setAuthor(data);
    }

    const onChangeUrl = (data) => {
        setUrl(data);
    }
    const onSubmitCreate = async (data) => {
        const result = await blogService.postNew(user, title, author, url);

        setRefreshBlogs(refreshBlogs + 1);
    };

    const renderLoginForm = !user && ready;

    return (
        <div>
            {user && <h2>blogs</h2>}
            {user && <BlogList
                blogs={blogs}
                user={user}
                onSubmitLogout={onSubmitLogout}
                onSubmitCreate={onSubmitCreate}
                onChangeTitle={onChangeTitle}
                onChangeAuthor={onChangeAuthor}
                onChangeUrl={onChangeUrl}
            />}
            {renderLoginForm &&
                <LoginForm
                    username={username || ""}
                    onSubmit={onSubmitLogin}
                    onChangeUsername={onChangeUsername}
                    onChangePassword={onChangePassword}/>}
        </div>
    );
}

export default App;
