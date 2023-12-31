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

export default CreateForm;
