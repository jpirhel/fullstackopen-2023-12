import PhoneNumber from "./PhoneNumber.jsx";

const PhoneNumberList = ({persons, deleteHandler}) => {
    return (
        <>
            {persons.map((person) => <PhoneNumber
                key={person.name}
                person={person}
                deleteHandler={() => deleteHandler(person)}/>)}
        </>
    )
}

export default PhoneNumberList;
