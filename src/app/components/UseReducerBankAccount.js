import { useReducer } from "react";

export default function UserReducerBankAccount() {
  let initialState = {
    balance: 0,
    loan: 0,
    value: 0,
    isActive: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "deposit":
        console.log(action);
        return { ...state, balance: state.balance + action.payload, value: 0 };
      case "withdraw":
        return { ...state, balance: state.balance - action.payload, value: 0 };
      case "senctionLoan":
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: action.payload,
          value: 0,
        };
      case "repayLoan":
        return {
          ...state,
          balance: state.balance - action.payload,
          loan: state.loan - action.payload,
        };
      case "openAccount":
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      case "closeAccount":
        return {
          ...state,
          isActive: false,
        };
      case "changeValue":
        console.log(action.paylaod);
        return {
          ...state,
          value: action.paylaod,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function withdrawHandler() {
    if (
      !state.isActive ||
      state.balance < state.value ||
      Number(state.value) === 0
    ) {
      if (!state.isActive) alert("Account is not active yet!");
      if (state.balance < state.value) alert("Insufficient balance!");
      if (Number(state.value) === 0) alert("Enter a valid amount!");
      return;
    }
    dispatch({ type: "withdraw", payload: Number(state.value) });
  }

  function depositHandler() {
    if (!state.isActive || Number(state.value) === 0) {
      if (!state.isActive) alert("Account is not active yet!");
      if (Number(state.value) === 0) alert("Enter a valid amount!");
      return;
    }
    dispatch({ type: "deposit", payload: Number(state.value) });
  }

  function senctionLoanHandler() {
    if (!state.isActive || state.loan > 0) {
      if (!state.isActive) alert("Account is not active yet!");
      if (state.loan > 0) alert("1 loan already active!");
      return;
    }
    dispatch({ type: "senctionLoan", payload: Number(state.value) });
  }

  function repayLoanHandler() {
    if (
      !state.isActive ||
      state.balance < state.value ||
      Number(state.value) === 0 ||
      Number(state.value) > state.loan
    ) {
      if (!state.isActive) alert("Account is not active yet!");
      if (state.balance < state.value) alert("Insuffient balance!");
      if (Number(state.value) === 0) alert("Enter a valid amount!");
      if (Number(state.value) > state.loan)
        alert("Repay amount should be less then loan amount!");
      return;
    }
    dispatch({ type: "repayLoan", payload: Number(state.value) });
  }

  function closeAccountHandler() {
    if (!state.isActive || state.balance > 0 || state.loan > 0) {
      if (!state.isActive) alert("Account is not active yet!");
      if (state.balance > 0)
        alert("Please clear remaing balance before closing!");
      if (state.loan > 0) alert("An active loan exists");
      return;
    }
    dispatch({ type: "closeAccount" });
  }

  function openAccountHandler() {
    console.log("openAccount!");

    if (state.isActive) {
      alert("Account is already active!");
      return;
    }
    console.log("openAccount!");
    dispatch({ type: "openAccount" });
  }

  function changeValueHandler(val) {
    console.log(val);
    dispatch({ type: "changeValue", paylaod: val });
  }

  return (
    <>
      <h1>Use Reducer Bank Account</h1>
      <h2>Balance : {state.balance}</h2>
      <h2>Loan : {state.loan}</h2>
      <input
        type="number"
        value={state.value}
        onChange={(e) => changeValueHandler(e.target.value)}
      />
      <Button isActive={!state.isActive} clickHandler={openAccountHandler}>
        Open Account
      </Button>
      <Button isActive={state.isActive} clickHandler={depositHandler}>
        Deposit Amount
      </Button>
      <Button isActive={state.isActive} clickHandler={withdrawHandler}>
        Withdraw Amount
      </Button>
      <Button isActive={state.isActive} clickHandler={senctionLoanHandler}>
        Request a Loan
      </Button>
      <Button isActive={state.isActive} clickHandler={repayLoanHandler}>
        Pay Loan
      </Button>
      <Button isActive={state.isActive} clickHandler={closeAccountHandler}>
        Close Account
      </Button>
    </>
  );
}

function Button({ children, isActive, clickHandler }) {
  const isButtonDisabled = !isActive;
  return (
    <>
      <button disabled={isButtonDisabled} onClick={() => clickHandler()}>
        {children}
      </button>
      <br />
    </>
  );
}
