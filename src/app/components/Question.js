import Options from "./Options";

export default function Question({ question, dispatch, selectedAnswer }) {
  console.log(question);
  return (
    <div className="options">
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
