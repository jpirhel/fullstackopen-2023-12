import _ from "lodash";

import {useRef, useState, useEffect} from 'react'

import Togglable from './components/Togglable'

import Message from "./components/Message";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import CreateForm from "./components/CreateForm";

import blogService from './services/blogs'
import loginService from "./services/login";

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

    const refresh = () => {
        setRefreshBlogs(refreshBlogs + 1);
    };
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

        refresh();

        showMessage(message, "success");

        // noinspection JSUnresolvedReference
        togglableCreateFormRef.current.toggleVisibility();
    };

    const onHandleLike = async (blog) => {
        try {
            await blogService.addLike(user, blog);

            refresh();
        } catch (e) {
            console.log("Failed to add like, error:", e);
        }
    };

    const onHandleDelete = async (blog) => {
        const message = `Remove blog ${blog.title} by ${blog.user.name}?`;

        if (window.confirm(message)) {
            await blogService.deleteBlog(user, blog);

            refresh();
        }
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
                onHandleLike={onHandleLike}
                onHandleDelete={onHandleDelete}
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
