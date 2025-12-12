import styles from "./Timer.module.css"

function Timer({timer}) {

  // Minutes calculation
  const minutes = Math.floor((timer) / 6000);

  // Seconds calculation
  const seconds = Math.floor((timer % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = timer % 100;

  return <div className={styles.timer}>Timer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:{milliseconds.toString().padStart(2, "0")}</div>
}

export default Timer;