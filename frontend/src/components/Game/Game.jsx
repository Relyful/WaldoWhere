import { useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";
import waldoImage1 from "../../assets/Waldo1.jpg";
import WinDialog from "../WinDialog/WinDialog";
import { useGameTimer } from "../../hooks/useGameTimer";
import { callGameStart, callGameGuess, callStopTimer } from "../../api/gameApi";
import { getClickPercent } from "../../utils/gameUtils";

function TargetBox({ top, left, handleGameGuess, correctGuesses }) {
  const availableChars = ["Waldo", "Odlaw", "Wizard"];
  const foundCharacters = correctGuesses.map((x) => x.name);
  const guessOptions = availableChars.map((name) => {
    return (
      <li
        key={name}
        className={foundCharacters.includes(name) ? styles.disabled : undefined}
        onClick={
          !foundCharacters.includes(name)
            ? (e) => handleGameGuess(e, name)
            : (e) => e.stopPropagation()
        }
      >
        {name}
      </li>
    );
  });
  console.log(foundCharacters);
  return (
    <div
      className={styles.target}
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={`${styles.targetMenu}`}>
        <ul>{guessOptions}</ul>
      </div>
    </div>
  );
}

function CorrectGuessBoxes({ correctGuesses }) {
  const correctGuessMarkers = correctGuesses?.map((guess) => {
    return (
      <div
        key={`${guess.y},${guess.x}`}
        style={{
          position: "absolute",
          top: `${guess.y}%`,
          left: `${guess.x}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        ⭐
      </div>
    );
  });
  return <>{correctGuessMarkers}</>;
}

function Game() {
  const gameElement = useRef(null);
  const abortControllerRef = useRef(null);
  const [clickTarget, setClickTarget] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const { timer, stopTimer, intervalRef } = useGameTimer();  

  const win = correctGuesses.length > 2;

  // start timer on server
  useEffect(() => {
    const controller = new AbortController();    
    callGameStart(controller);
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

  function handleGameContainerClick(e) {
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
    callGameGuess(x, y, name, abortControllerRef.current.signal, setCorrectGuesses);
    return setClickTarget(null);
  }

  const areThereCorrectGuesses = (() => correctGuesses.length > 0)();

  return (
    <>
      {win && <WinDialog />}
      <Timer timer={timer} stopTimer={stopTimer} intervalRef={intervalRef} />
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
    </>
  );
}

export default Game;
