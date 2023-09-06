export default function Options({ question, dispatch, selectedAnswer }) {
  const hasAnswered = selectedAnswer !== null;
  console.log(hasAnswered, " : ", selectedAnswer);
  return (
    <>
      {question.options.map((eOption, index) => {
        return (
          <button
            className={`btn btn-option 
            ${
              selectedAnswer === index
                ? selectedAnswer === question.correctOption
                  ? "answer correct"
                  : "answer wrong"
                : ""
            }

            ${hasAnswered && index === question.correctOption ? "correct" : ""}
            `}
            onClick={() => dispatch({ type: "updateAnswer", payload: index })}
            disabled={hasAnswered}
            key={eOption}
          >
            {eOption}
          </button>
        );
      })}
    </>
  );
}
