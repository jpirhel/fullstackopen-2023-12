const AddPersonForm = ({handleSubmit, handleName, handleNumber, name, number}) =>{
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input onChange={handleName} value={name}/>
            </div>
            <div>
                number: <input onChange={handleNumber} value={number}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPersonForm;
