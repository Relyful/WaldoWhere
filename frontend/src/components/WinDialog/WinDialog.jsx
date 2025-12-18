import { callSaveToLeaderboard } from '../../api/gameApi';
import styles from './WinDialog.module.css';
import { useFormStatus } from "react-dom";
import { useNavigate } from "react-router";


function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      {pending ? "Saving..." : "Save to leaderboards"}
    </button>
  )
}

export default function WinDialog({ timer }) {
  // Minutes calculation
  const minutes = Math.floor(timer / 60);

  // Seconds calculation
  const seconds = timer % 60;

  const navigate = useNavigate();

  function handleFormOnSubmit(formData) {
    callSaveToLeaderboard(formData);
    navigate('/leaderboard');
  }
  
  return (
  <div className={styles.dialogBackdrop}>
    <div className={styles.dialogContent}>
      <h3>Congratulations!</h3>
      <p>Your time is (mm:ss): {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
      <form className={`${styles.winForm}`} action={handleFormOnSubmit}>
        <label htmlFor="username">Enter your name:</label>
        <input type="text" name="username" id="username" />
        <Submit />
      </form>
    </div>    
  </div>
  )
}
