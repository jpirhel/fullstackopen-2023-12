import {useState} from "react";

const CreateForm = ({onSubmit}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

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

    const onSubmitForm = () => {
        onSubmit(title, author, url);
        document.getElementById("createForm").reset();
    };

    return (
        <div style={style}>
            <h2 style={headerStyle}>create new</h2>
            <form id="createForm" data-testid="createform" onSubmit={onSubmitForm}>
                title: <input aria-label="Title" type="text" name="Title" value={title}
                              onChange={({target}) => setTitle(target.value)}/><br/>
                author: <input aria-label="Author" type="text" name="Author" value={author}
                               onChange={({target}) => setAuthor(target.value)}/><br/>
                url: <input aria-label="Url" type="text" name="Url" value={url} onChange={({target}) => setUrl(target.value)}/>
                <button type="submit" aria-label="create" data-testid="createbutton">create</button>
            </form>
        </div>
    );
}

export default CreateForm;
