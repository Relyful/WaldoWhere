import styles from "./Timer.module.css"

function Timer({timer}) {

  // Minutes calculation
  const minutes = Math.floor(timer / 60);

  // Seconds calculation
  const seconds = timer % 60;

  return <div className={styles.timer}>Timer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</div>
}

export default Timer;