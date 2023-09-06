export default function NextButton({
  dispatch,
  selectedAnswer,
  index,
  numOfQuestions,
}) {
  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
}
