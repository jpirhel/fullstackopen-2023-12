import PhoneNumber from "./PhoneNumber.jsx";

const PhoneNumberList = ({persons}) => {
    return (
        <>
            {persons.map((person) => <PhoneNumber key={person.name} person={person}/>)}
        </>
    )
}

export default PhoneNumberList;
