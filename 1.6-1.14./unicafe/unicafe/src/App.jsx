/* eslint-disable react/prop-types */
import { useState } from "react";

const Statistics = (props) => {
  if (props.total === 0) {
    return <p>No Feedback Given!</p>;
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>
              <StatisticsLine value={props.good} />
            </td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>
              <StatisticsLine value={props.neutral} />
            </td>
          </tr>
          <tr>
            <td>bad</td>
            <td>
              <StatisticsLine value={props.bad} />
            </td>
          </tr>
          <tr>
            <td>total</td>
            <td>
              <StatisticsLine value={props.total} />
            </td>
          </tr>
          <tr>
            <td>average</td>
            <td>
              <StatisticsLine value={props.average} />
            </td>
          </tr>
          <tr>
            <td>positive</td>
            <td>
              <StatisticsLine value={props.positive} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const Button = (props) => {
  return (
    // eslint-disable-next-line react/prop-types
    <button onClick={() => props.handleClick(props.text)}>{props.text}</button>
  );
};

const StatisticsLine = (props) => {
  return <>{props.value}</>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Incrementing state
  const setState = (state) => {
    if (state === "good") {
      setGood(good + 1);
    } else if (state === "neutral") {
      setNeutral(neutral + 1);
    } else if (state === "bad") {
      setBad(bad + 1);
    }
  };

  // additional sums
  let total = good + bad + neutral;
  let average = total / 3;
  let positive = (good / total) * 100 || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setState} text="good" />
      <Button handleClick={setState} text="neutral" />
      <Button handleClick={setState} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
