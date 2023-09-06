import { useState, useReducer } from "react";

let initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "incCount":
      return { ...state, count: state.count + state.step };
    case "decCount":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "resetAll":
      return initialState;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  function defineStep(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  }

  function decCount() {
    dispatch({ type: "decCount" });
  }

  function defineCount(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function incCount() {
    dispatch({ type: "incCount" });
  }

  function resetStates() {
    dispatch({ type: "resetAll" });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={decCount}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={incCount}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={resetStates}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
