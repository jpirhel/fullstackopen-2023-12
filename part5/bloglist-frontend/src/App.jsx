import _ from "lodash";

import {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from "./services/login";

const Message = ({message, messageType}) => {
    if (_.isEmpty(message || _.isEmpty(messageType))) {
        return null;
    }

    const color = messageType === "error" ? "red" : "green";

    const style = {
        borderStyle: "solid",
        padding: 10,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: color,
        backgroundColor: "#eeeeee",
    };

    return (
        <div style={style}>{message}</div>
    );
}

const BlogList = (props) => {
    const blogs = _.get(props, "blogs") || [];

    return (
        <>
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

const CreateForm = ({
                        title,
                        author,
                        url,
                        onSubmit,
                        onChangeTitle,
                        onChangeAuthor,
                        onChangeUrl,
                    }) => {
    // comment to mark assigment 5.6 - CreateForm is a separate component
    // using handlers and values as props

    const style = {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "gray",
        backgroundColor: "#eee",
        paddingLeft: 10,
        paddingBottom: 10,
        marginBottom: 10,
    };

    const headerStyle = {
        marginTop: 0,
    };

    return (
        <div style={style}>
            <h2 style={headerStyle}>create new</h2>
            <form>
                title: <input type="text" name="Title" value={title}
                              onChange={({target}) => onChangeTitle(target.value)}/><br/>
                author: <input type="text" name="Author" value={author}
                               onChange={({target}) => onChangeAuthor(target.value)}/><br/>
                url: <input type="text" name="Url" value={url} onChange={({target}) => onChangeUrl(target.value)}/>
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

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const togglableCreateFormRef = useRef();

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

        if (_.isEmpty(result)) {
            showMessage("wrong username or password", "error");
            return;
        }

        setUser(result);
        window.localStorage.setItem("user", JSON.stringify(result));
    }

    const logout = () => {
        window.localStorage.removeItem("user");
        setUser(null);
    }

    const showMessage = (message, messageType) => {
        setMessage(message);
        setMessageType(messageType);

        setTimeout(() => {
            // clear message
            setMessage("");
            setMessageType("");
        }, 5000);
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

        const message = `a new blog ${title} by ${author} added`;

        setAuthor("");
        setTitle("");
        setUrl("");

        setRefreshBlogs(refreshBlogs + 1);

        showMessage(message, "success");

        // noinspection JSUnresolvedReference
        togglableCreateFormRef.current.toggleVisibility();
    };

    const renderLoginForm = !user && ready;

    const renderUser = ! _.isEmpty(user);

    const togglableCreateFormStyle = {marginTop: 10};

    const togglableCreateForm = (
        <div style={togglableCreateFormStyle}>
            <Togglable buttonLabel="new note" ref={togglableCreateFormRef}>
                <CreateForm
                    title={title}
                    author={author}
                    url={url}
                    onSubmit={onSubmitCreate}
                    onChangeTitle={onChangeTitle}
                    onChangeAuthor={onChangeAuthor}
                    onChangeUrl={onChangeUrl}
                />
            </Togglable>
        </div>
    );

    return (
        <div>
            {renderUser || <h2>log in to application</h2>}
            <Message message={message} messageType={messageType}/>
            {renderUser && <h2>blogs</h2>}
            {renderUser && <>{user.name} logged in</>}
            <LogoutForm onSubmit={onSubmitLogout}/>
            {user && togglableCreateForm}
            <div>&nbsp;</div>
            {renderUser && <BlogList
                blogs={blogs}
                user={user}
                title={title}
                author={author}
                url={url}
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
