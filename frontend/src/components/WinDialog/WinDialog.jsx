import styles from './WinDialog.module.css';

export default function WinDialog() {
  return <div className={styles.dialogBackdrop}>
    <div className={styles.dialogContent}>You Win</div>
  </div>
}
