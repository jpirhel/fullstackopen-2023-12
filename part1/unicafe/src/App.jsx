import {useState} from 'react'

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticsLine = ({name, value, suffix}) => {
    return (<>{name} {value} {suffix}<br/></>);
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;

    const hasFeedback = all > 0;

    if (! hasFeedback) {
        return <p>No feedback given</p>;
    }

    const average = (good + (bad * -1)) / all;
    const positive = (good / all) * 100;

    return (
        <>
            <StatisticsLine name="good" value={good}/>
            <StatisticsLine name="neutral" value={neutral}/>
            <StatisticsLine name="bad" value={bad}/>
            <StatisticsLine name="all" value={all}/>
            <StatisticsLine name="average" value={average}/>
            <StatisticsLine name="positive" value={positive} suffix="%"/>
        </>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleOnGoodClicked = () => {
        setGood(good + 1);
    };
    const handleOnNeutralClicked = () => {
        setNeutral(neutral + 1);
    };
    const handleOnBadClicked = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => handleOnGoodClicked()} text="good"/>
            <Button onClick={() => handleOnNeutralClicked()} text="neutral"/>
            <Button onClick={() => handleOnBadClicked()} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;
