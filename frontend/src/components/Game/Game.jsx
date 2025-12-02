import { useRef, useState } from 'react';
import styles from './Game.module.css'
import waldoImage1 from '../../assets/Waldo1.jpg'

function TargetBox({top, left}) {
  return (
    <div className={styles.target} style={{position: 'absolute', top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)'}}>
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
    const result = {
      'x': mouseClickX - elementX,
      'y': mouseClickY - elementY,
    };
    const xPercentage = (result.x / rect.width) * 100;
    const yPercentage = (result.y / rect.height) * 100;
    console.log({xPercentage, yPercentage});
    setClickTarget({
      'x': xPercentage,
      'y': yPercentage,
    });
    return;    
  }

  function handleGameContainerClick(e) {    
    if (clickTarget !== null) {
      return setClickTarget(null);
    }
    return;
    }

  function calculateTargetPosition() {
    const element = gameElement.current;
    if (!element || !clickTarget) {
      return { top: 0, left: 0 };
    }
    const rect = element.getBoundingClientRect();
    const top = (rect.height / 100) * clickTarget.y;
    const left = (rect.width / 100) * clickTarget.x;
    return {
      'top': top,
      'left': left,
    }
  }
  const targetPosition = calculateTargetPosition();

  return (
    <div className={styles.gameContainer} onClick={handleGameContainerClick}>
      <div className={styles.gameArea} onClick={handleGameAreaClick} ref={gameElement}>
        <img src={waldoImage1} alt="Where's Waldo game" className={styles.waldoPic}/>
        {clickTarget && <TargetBox top={clickTarget.y} left={clickTarget.x} key={`${clickTarget.x}-${clickTarget.y}`}/>}
      </div>
    </div>
  )
}

export default Game;