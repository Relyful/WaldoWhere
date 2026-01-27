import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";
import { fetchLeaderboard } from "../../api/gameApi";
import { convertDateToString } from "../../utils/leaderboardUtils";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadLeaderboard() {
      const fetchedLeaderBoardData = await fetchLeaderboard(
        abortController.signal,
      );
      console.log(fetchedLeaderBoardData);
      setLeaderboardData(fetchedLeaderBoardData);
    }
    loadLeaderboard();
    return () => {
      abortController.abort();
    };
  }, []);

  if (!leaderboardData) {
    return <div className={styles.loading}>Loading...</div>;
  }
const leaderboardList = leaderboardData.map((obj) => {
  const totalMs = obj.timer;

  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  
  return (
    <li className={styles.gridContainer} key={obj.id}>
      <div className={styles.listName}>{obj.name}</div>
      <div className={styles.listTime}>{" "}
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}{" "}</div>
      <div className={styles.listDate}>{convertDateToString(obj.date)}</div>
    </li>
  );
});


  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.heading2}>Leaderboards</h2>
      <ul>
        <li className={`${styles.gridContainer} ${styles.listHeader}`}>
          <div className={`${styles.listName} ${styles.listHeader}`}>Name</div>
          <div className={`${styles.listTime} ${styles.listHeader}`}>Time</div>
          <div className={`${styles.listDate} ${styles.listHeader}`}>Date</div>
        </li>
        {leaderboardList}
      </ul>
    </div>
  );
}
