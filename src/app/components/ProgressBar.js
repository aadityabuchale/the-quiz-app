export default function ProgressBar({
  index,
  numQuestions,
  points,
  totalPoints,
  selectedAnswer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(selectedAnswer !== null)}
      />
      <p>
        <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
