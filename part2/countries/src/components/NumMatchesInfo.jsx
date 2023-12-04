const NumMatchesInfo = ({countries}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>);
    }

    return null;
}
export default NumMatchesInfo;
