import React from "react";
import "./styles.css";

const TIMER = 8;

export default function App() {
  const { isRunning, pause, cont, start, end, timer } = useCustomTimer(TIMER);

  return (
    <div className="App">
      {timer}
      <div style={{ marginTop: "20px" }}>
        <button disabled={isRunning} onClick={start}>
          Start
        </button>
        <button onClick={end}>End</button>
      </div>
      {isRunning && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={pause}>Pause</button>
          <button onClick={cont}>Continue</button>
        </div>
      )}
    </div>
  );
}

function useCustomTimer(defaultTimer) {
  const [timer, setTimer] = React.useState(defaultTimer);
  const [isRunning, setIsRunning] = React.useState(false);
  const timerRef = React.useRef(null);

  const start = () => {
    setIsRunning(true);
    const intervalId = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    timerRef.current = intervalId;
  };
  const end = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimer(TIMER);
  };

  const pause = () => {
    clearInterval(timerRef.current);
  };

  const cont = () => {
    start();
  };

  React.useEffect(() => {
    if (timer < 0) {
      end();
    }
  }, [timer]);

  React.useEffect(() => {
    return () => {
      timerRef && clearInterval(timerRef.current);
    };
  }, []);

  return { isRunning, start, end, pause, cont, timer };
}
