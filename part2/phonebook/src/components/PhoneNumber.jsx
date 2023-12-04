const PhoneNumber = ({person, deleteHandler}) => {
    const {name, number} = person;

    return (<>{name} {number} <button onClick={deleteHandler}>delete</button><br/></>);
}

export default PhoneNumber;
