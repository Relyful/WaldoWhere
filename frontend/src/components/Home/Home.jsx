import style from './Home.module.css';
import { Link } from "react-router";

export default function Homepage() {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.heading}>Welcome to WaldoWhere</h1>
        <Link to='/game' className={style.startButton}>Start</Link>
      </div>
    </>
  )
}