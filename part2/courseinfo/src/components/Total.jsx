const Total = ({course}) => {
    const {parts} = course;

    const numExercises = parts.reduce((acc, part) => {
        const {exercises} = part;
        return acc + exercises;
    }, 0);

    return (
        <b>total of {numExercises} exercises</b>
    );
}

export default Total;
