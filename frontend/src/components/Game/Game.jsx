import { useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";
import waldoImage1 from "../../assets/Waldo1.jpg";
import WinDialog from "../WinDialog/WinDialog";
import { useGameTimer } from "../../hooks/useGameTimer";
import { callGameStart, callGameGuess, callStopTimer } from "../../api/gameApi";
import { getClickPercent } from "../../utils/gameUtils";
import TargetBox from "./TargetBox";
import CorrectGuessBoxes from "./CorrecGuessBoxes";
import { useOutletContext } from "react-router";
import waldo from "../../assets/waldo.jpeg"
import odlaw from "../../assets/odlaw.webp"
import wizard from "../../assets/wizard.webp"

function Game() {
  const gameElement = useRef(null);
  const abortControllerRef = useRef(null);
  const [clickTarget, setClickTarget] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const { timer, stopTimer, intervalRef } = useGameTimer();  
  const { setNotification } = useOutletContext()

  const win = correctGuesses.length > 2;

  // start timer on server
  useEffect(() => {
    const controller = new AbortController();    
    async function startTimer() {
      await callGameStart(controller);
      setLoading(false);
    };
    startTimer();
    return () => controller.abort();
  }, []);

  // win effect
  useEffect(() => {
    if (!win) return;
    callStopTimer();
    stopTimer();
  }, [win]);

  function handleGameAreaClick(e) {
    e.stopPropagation();
    const coords = getClickPercent(e, gameElement);
    setClickTarget(coords);
    return;
  }

  function handleGameContainerClick() {
    if (clickTarget !== null) {
      return setClickTarget(null);
    }
    return;
  }

  async function handleGameGuess(e, name) {
    e.stopPropagation();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const x = clickTarget.x;
    const y = clickTarget.y;
    callGameGuess(x, y, name, abortControllerRef.current.signal, setCorrectGuesses, setNotification);
    return setClickTarget(null);
  }

  const areThereCorrectGuesses = (() => correctGuesses.length > 0)();

  return (
    <>
      {(loading || imageLoading) && (<div className={styles.loading}>Loading...</div>)}
      <div style={{ display: (loading || imageLoading) ? 'none' : 'block' }}>
        {win && <WinDialog timer={timer} />}
        <div className={styles.topRow}>
          <Timer timer={timer} stopTimer={stopTimer} intervalRef={intervalRef} />
          <div className={styles.characterFaces}>
            <img src={waldo} alt="waldo head pic" className={styles.headPic} />
            <img src={odlaw} alt="odlaw head pic" className={styles.headPic} />
            <img src={wizard} alt="wizard head pic" className={styles.headPic} />
          </div>
        </div>
        <div className={styles.gameContainer} onClick={handleGameContainerClick}>
          <div
            className={styles.gameArea}
            onClick={handleGameAreaClick}
            ref={gameElement}
          >
            <img
              src={waldoImage1}
              alt="Where's Waldo game"
              className={styles.waldoPic}
              onLoad={() => setImageLoading(false)}
            />
            {clickTarget && (
              <TargetBox
                top={clickTarget.y}
                left={clickTarget.x}
                handleGameGuess={handleGameGuess}
                correctGuesses={correctGuesses}
                key={`${clickTarget.x}-${clickTarget.y}`}
              />
            )}
            {areThereCorrectGuesses && (
              <CorrectGuessBoxes correctGuesses={correctGuesses} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
