import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";
import { fetchLeaderboard } from "../../api/gameApi";

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
    return <>Loading...</>;
  }
const leaderboardList = leaderboardData.map((obj) => {
  const totalMs = obj.timer;

  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);

  return (
    <li key={obj.id}>
      Name: {obj.name}, Time:{" "}
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")},{" "}
      date: {obj.date}
    </li>
  );
});


  return (
    <div className={styles.leaderboard}>
      <h2>Leaderboards</h2>
      <ul>{leaderboardList}</ul>
    </div>
  );
}
