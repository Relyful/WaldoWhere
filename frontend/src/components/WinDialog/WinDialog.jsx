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

export default function WinDialog() {
  return (
  <div className={styles.dialogBackdrop}>
    <div className={styles.dialogContent}>
      You Win
      <form>
      <input type="text" name="username" id="username" />
      <Submit />
    </form>
    </div>    
  </div>
  )
}
