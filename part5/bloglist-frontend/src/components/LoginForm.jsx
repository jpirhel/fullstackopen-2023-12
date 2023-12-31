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

export default LoginForm;
