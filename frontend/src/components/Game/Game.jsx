import styles from './Game.module.css'

function handleGameAreaClick(e) {
  console.log(e);
}

function Game() {
  return (
    <div className={styles.gameArea} onClick={handleGameAreaClick}>

    </div>
  )
}

export default Game;