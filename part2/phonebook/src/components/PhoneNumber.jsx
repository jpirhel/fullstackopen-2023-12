const PhoneNumber = ({person}) => {
    const {name, number} = person;

    return (<>{name} {number}<br/></>);
}

export default PhoneNumber;
