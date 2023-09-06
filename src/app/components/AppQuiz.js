import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import questionsData from "../data/questions";

const initialState = {
    questions: [],
    status: "loading", // loading, ready, failed, active, finished
    index: 0,
    selectedAnswer: null,
    points: 0,
    maxPoints: 0,
    timer: null,
};

const TIME_PER_QUES = 30;

function reducer(state, action) {
    switch (action.type) {
        case "questionsFetched":
            return { ...state, questions: action.payload, status: "ready" };
        case "fetchFailed":
            return { ...state, questions: [], status: "failed" };
        case "start":
            return {
                ...state,
                status: "active",
                timer: state.questions.length * TIME_PER_QUES,
            };
        case "updateAnswer":
            const question = state.questions[state.index];
            return {
                ...state,
                selectedAnswer: action.payload,
                points:
                    question.correctOption === action.payload
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, selectedAnswer: null };
        case "finishQuiz":
            return {
                ...state,
                status: "finished",
                maxPoints:
                    state.points > state.maxPoints
                        ? state.points
                        : state.maxPoints,
            };
        case "restartQuiz":
            return {
                ...state,
                points: 0,
                maxPoints: state.maxPoints,
                index: 0,
                selectedAnswer: null,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                timer: state.timer - 1,
                status: state.timer === 1 ? "finished" : state.status,
            };
        default:
            return state;
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { questions, status, index, selectedAnswer, points, timer } = state;
    const numOfQuestions = questions.length;
    const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

    useEffect(() => {
        // fetch("http://localhost:8000/questions")
        //   .then((res) => res.json())
        //   .then((data) => dispatch({ type: "questionsFetched", payload: data }))
        //   .catch((err) => dispatch({ type: "fetchFailed" }));

        dispatch({ type: "questionsFetched", payload: questionsData });
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "failed" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numOfQuestions={numOfQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && (
                    <>
                        <ProgressBar
                            index={index}
                            numQuestions={numOfQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            selectedAnswer={selectedAnswer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            selectedAnswer={selectedAnswer}
                        />
                        <Footer>
                            <Timer dispatch={dispatch} timer={timer} />
                            <NextButton
                                dispatch={dispatch}
                                selectedAnswer={selectedAnswer}
                                index={index}
                                numOfQuestions={numOfQuestions}
                            />
                        </Footer>
                    </>
                )}

                {status === "finished" && (
                    <FinishedScreen
                        points={points}
                        totalPoints={totalPoints}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
