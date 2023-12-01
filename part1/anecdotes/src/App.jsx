import { useState } from 'react'

const Anecdote = ({anecdotes, selected, votes}) => {
    const text = anecdotes[selected];

    return (
        <>
            {text}<br/>
            has {votes} votes<br/>
        </>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const randomAnecdoteIndex = () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

        const min = 0;
        const max = Math.floor(anecdotes.length);

        return Math.floor(Math.random() * (max - min) + min);
    }

    const initialAnecdote = randomAnecdoteIndex();

    const [votes, setVotes] = useState({});
    const [selected, setSelected] = useState(initialAnecdote)

    const handleOnClickVote = () => {
        const currentVotesForSelected = votes[selected] || 0;

        const nextVotes = {...votes};
        nextVotes[selected] = currentVotesForSelected + 1;

        setVotes(nextVotes);
    }
    const handleOnClickNextAnecdote = () => {
        const nextAnecdoteIndex = randomAnecdoteIndex();

        setSelected(nextAnecdoteIndex);
    }

    const currentVotes = votes[selected] || 0;

    // NOTE probably not the best way to implement this

    let mostVotesIndex = 0;
    let mostVotesValue = 0;

    for (const [key, value] of Object.entries(votes)) {
        if (value > mostVotesValue) {
            mostVotesValue = value;
            mostVotesIndex = key;
        }
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdotes={anecdotes} selected={selected} votes={currentVotes}/>
            <button onClick={handleOnClickVote}>vote</button>
            <button onClick={handleOnClickNextAnecdote}>next anecdote</button>
            <h1>Anecdote with the most votes</h1>
            <Anecdote anecdotes={anecdotes} selected={mostVotesIndex} votes={mostVotesValue}/>
        </>
    )
}

export default App
