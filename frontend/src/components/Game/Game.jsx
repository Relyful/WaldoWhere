import { useRef, useState } from 'react';
import styles from './Game.module.css'

function TargetBox({top, left}) {
  console.log(top, left)
  return (
    <div className={styles.target} style={{position: 'absolute', top: top, left: left}}>
      <div className={styles.targetMenu}>
      <ul>
        <li>Waldo</li>
        <li>Yellow Waldo</li>
        <li>Wizard</li>
      </ul>
    </div>
    </div>
    
  )
}

function Game() {
  const gameElement = useRef(null);
  const [clickTarget, setClickTarget] = useState(null);

  function handleGameAreaClick(e) {
    if (clickTarget !== null) {
      return setClickTarget(null);
    }
    const rect = gameElement.current.getBoundingClientRect();
    const mouseClickX = e.clientX;
    const mouseClickY = e.clientY;
    const elementX = rect.left;
    const elementY = rect.top;
    setClickTarget({
      // -5 to center target on the middle of the mouse
      'x': mouseClickX - elementX - 5,
      'y': mouseClickY - elementY - 5,
    });
    console.log('fired')
    return;
  }


  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameArea} onClick={handleGameAreaClick} ref={gameElement}>
        {clickTarget && <TargetBox top={clickTarget.y} left={clickTarget.x} />}
      </div>
    </div>
  )
}

export default Game;