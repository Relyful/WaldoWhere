import style from './Home.module.css';
import { Link } from "react-router";
import waldo from '../../assets/waldo.jpeg'
import odlaw from '../../assets/odlaw.webp'
import wizard from '../../assets/wizard.webp'

export default function Homepage() {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.heading}>Welcome to WaldoWhere</h1>
        <h2 className={style.secondHeading}>Find following characters: </h2>
        <div className={style.characterList}>
          <img src={waldo} alt="waldo" className={style.headPic}/>
          <img src={odlaw} alt="odlaw" className={style.headPic}/>
          <img src={wizard} alt="wizard" className={style.headPic}/>
        </div>
        <Link to='/game' className={style.startButton}>Start</Link>
      </div>
    </>
  )
}