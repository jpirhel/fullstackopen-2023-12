import {useState} from 'react'

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
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
            <h1>Statistics</h1>
            good {good}<br/>
            neutral {neutral}<br/>
            bad {bad}
        </div>
    )
}

export default App;
