import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = () => {
    let number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const highestCopy = [...points];
  const largestIndex = highestCopy.indexOf(Math.max(...highestCopy));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={getRandom}>next anecdote</button>

      <div>
        <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[largestIndex]} <br /> has {points[largestIndex]} votes
        </p>
      </div>
    </>
  );
};

export default App;
