import { useEffect } from "react";

export default function Timer({ dispatch, timer }) {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(timer);
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mins = parseInt(timer / 60);
  const secs = timer % 60;

  return (
    <button className="btn btn-ui timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </button>
  );
}
