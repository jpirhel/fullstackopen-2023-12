import { useState } from 'react'

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

        console.log("nextVotes:", nextVotes);

        setVotes(nextVotes);
    }
    const handleOnClickNextAnecdote = () => {
        const nextAnecdoteIndex = randomAnecdoteIndex();
        console.log("next anecdote index:", nextAnecdoteIndex);

        setSelected(nextAnecdoteIndex);
    }

    const currentVotes = votes[selected] || 0;
    console.log("current votes for anecdote:", currentVotes);

    return (
        <div>
            {anecdotes[selected]}<br/>
            has {currentVotes} votes<br/>
            <button onClick={handleOnClickVote}>vote</button>
            <button onClick={handleOnClickNextAnecdote}>next anecdote</button>
        </div>
    )
}

export default App
