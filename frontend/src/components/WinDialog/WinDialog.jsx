import { callSaveToLeaderboard } from "../../api/gameApi";
import styles from "./WinDialog.module.css";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${styles.formSubmitButt} ${styles.button}`}>
      {pending ? "Saving..." : "Save to leaderboards"}
    </button>
  );
}

export default function WinDialog({ timer }) {
  const minutes = Math.floor(timer / 60);

  const seconds = timer % 60;

  const navigate = useNavigate();

  async function handleFormOnSubmit(formData) {
    await callSaveToLeaderboard(formData);
    navigate("/leaderboard");
  }

  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialogContent}>
        <h2 className={styles.heading2}>Congratulations!</h2>
        <p>
          You found Waldo and friends in (mm:ss):{" "}
          <span
            className={styles.biggerFont}
          >{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</span>
        </p>
        <form className={`${styles.winForm}`} action={handleFormOnSubmit}>
          <label htmlFor="username">Name:</label>
          <input type="text" name="username" id="username" className={styles.nameInput} />
          <Submit />
        </form>
          <div className={styles.linkContainer}>
            <Link to="/leaderboard" className={styles.button}>Leaderboard</Link>
            <Link to="/" className={styles.button}>Homepage</Link>
          </div>
      </div>
    </div>
  );
}
