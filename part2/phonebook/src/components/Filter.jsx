const Filter = ({handler, filter}) => {
    return (
        <>
            filter shown with <input onChange={handler} value={filter}/>
        </>
    )
};

export default Filter;
