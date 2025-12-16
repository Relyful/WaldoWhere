import { callSaveToLeaderboard } from '../../api/gameApi';
import styles from './WinDialog.module.css';
import { useFormStatus } from "react-dom"

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      {pending ? "Saving..." : "Save to leaderboards"}
    </button>
  )
}

export default function WinDialog({ timer }) {
//FINISH FETCH TO SAVE TO LEADERBOARDS

  // Minutes calculation
  const minutes = Math.floor(timer / 60);

  // Seconds calculation
  const seconds = timer % 60;
  
  return (
  <div className={styles.dialogBackdrop}>
    <div className={styles.dialogContent}>
      <h3>Congratulations!</h3>
      <p>Your time is (mm:ss): {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
      <form className={`${styles.winForm}`} action={callSaveToLeaderboard}>
        <label htmlFor="username">Enter your name:</label>
        <input type="text" name="username" id="username" />
        <Submit />
      </form>
    </div>    
  </div>
  )
}
