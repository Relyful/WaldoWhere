import { useRef, useState } from "react";
import Timer from "../Timer/Timer";
import styles from "./Game.module.css";
import waldoImage1 from "../../assets/Waldo1.jpg";
import WinDialog from "../WinDialog/WinDialog";

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
  const [timer, setTimer] = useState(0);
  const timerInterval = useRef(null);

  const win = correctGuesses.length > 2;

  function handleGameAreaClick(e) {
    e.stopPropagation();
    const rect = gameElement.current.getBoundingClientRect();
    const mouseClickX = e.clientX;
    const mouseClickY = e.clientY;
    const elementX = rect.left;
    const elementY = rect.top;
    const result = {
      x: mouseClickX - elementX,
      y: mouseClickY - elementY,
    };
    const xPercentage = (result.x / rect.width) * 100;
    const yPercentage = (result.y / rect.height) * 100;
    console.log({ xPercentage, yPercentage });
    setClickTarget({
      x: xPercentage,
      y: yPercentage,
    });
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
    const backendAddress =
      import.meta.env.VITE_backend_address || "http://localhost:8080";
    const x = clickTarget.x;
    const y = clickTarget.y;
    try {
      const response = await fetch(`${backendAddress}/guess`, {
        signal: abortControllerRef.current.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x: x,
          y: y,
          character: name,
        }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Error sending guess request.");
      }
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.hit) {
        setCorrectGuesses((prevState) => [...prevState, { x, y, name }]);
      }
    } catch (error) {
      console.error(error);
    }
    return setClickTarget(null);
  }

  async function handleStopTimer() {
    if (win) {
      const backendAddress =
        import.meta.env.VITE_backend_address || "http://localhost:8080";
      try {
        const response = await fetch(`${backendAddress}/game/stop`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error contacting server");
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const areThereCorrectGuesses = (() => correctGuesses.length > 0)();
  if (win) {
    handleStopTimer();
    clearInterval(timerInterval.current);
  }

  return (
    <>
      {win && <WinDialog />}
      <Timer timer={timer} setTimer={setTimer} timerInterval={timerInterval} />
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
