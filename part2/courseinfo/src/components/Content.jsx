import Part from "./Part.jsx";

const Content = ({course}) => {
    const {parts} = course;

    return (
        <>
            {parts.map(part => (<Part key={part.name} part={part}/>))}
        </>
    );
}

export default Content;
