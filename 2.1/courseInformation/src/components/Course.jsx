/* eslint-disable react/prop-types */

const Course = ({ course }) => {
  const totalAmount = course.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  );

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <h3>total of {totalAmount} exercises</h3>
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {" "}
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Course;
