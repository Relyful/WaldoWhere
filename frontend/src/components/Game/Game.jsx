import { useRef, useState } from 'react';
import styles from './Game.module.css'

function TargetBox({top, left}) {
  console.log(top, left)
  return (
    <div className={styles.target} style={{position: 'absolute', top: top, left: left}}>
      <div className={`${styles.targetMenu}`}>
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
    e.stopPropagation();
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
    return;    
  }

  function handleGameContainerClick(e) {    
    if (clickTarget !== null) {
      return setClickTarget(null);
    }
    return;
    }

  return (
    <div className={styles.gameContainer} onClick={handleGameContainerClick}>
      <div className={styles.gameArea} onClick={handleGameAreaClick} ref={gameElement}>
        {clickTarget && <TargetBox top={clickTarget.y} left={clickTarget.x} key={`${clickTarget.x}-${clickTarget.y}`}/>}
      </div>
    </div>
  )
}

export default Game;