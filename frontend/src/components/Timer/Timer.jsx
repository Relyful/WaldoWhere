import { useEffect } from "react";
import styles from "./Timer.module.css"

function Timer({timer, setTimer, timerInterval}) {
  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
    return () => clearInterval(timerInterval.current);
  }, []);

  // Minutes calculation
  const minutes = Math.floor((timer) / 6000);

  // Seconds calculation
  const seconds = Math.floor((timer % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = timer % 100;

  return <div className={styles.timer}>Timer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:{milliseconds.toString().padStart(2, "0")}</div>
}

export default Timer;