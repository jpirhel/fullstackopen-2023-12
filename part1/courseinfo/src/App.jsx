const Total = (props) => {
    const {course} = props;
    const {parts} = course;

    const numExercises = parts.reduce((acc, part) => {
        const {exercises} = part;
        return acc + exercises;
    }, 0);

    return (
        <p>Number of exercises {numExercises}</p>
    )
}

const Part = (props) => {
    const {part} = props;

    const {name, exercises} = part;

    return (
        <p>{name} {exercises}</p>
    );
}

const Content = (props) => {
    const {course} = props;
    const {parts} = course;

    return (
        <>
            {parts.map(part => (<Part key={part.name} part={part}/>))}
        </>
    );
}

const Header = (props) => {
    const {course} = props;
    const {name} = course;

    return (
        <h1>{name}</h1>
    );
}

const App = () => {
    const course = {
        name: 'Half Stack application development',

        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },

            {
                name: 'Using props to pass data',
                exercises: 7,
            },

            {
                name: 'State of a component',
                exercises: 14,
            },
        ]
    };

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default App
