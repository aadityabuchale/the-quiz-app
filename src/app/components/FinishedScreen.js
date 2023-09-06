export default function FinishedScreen({ points, totalPoints, dispatch }) {
  const percentage = ((points / totalPoints) * 100).toFixed(2);
  let emoji = "";
  if (percentage === 100) emoji = "🏆";
  else if (percentage >= 80 && percentage < 100) emoji = "🙂";
  else if (percentage >= 50 && percentage < 80) emoji = "🤔";
  else emoji = "🙈";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({percentage} %)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart!
      </button>
    </>
  );
}
