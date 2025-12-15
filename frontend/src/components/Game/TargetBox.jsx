import styles from './Game.module.css'

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

export default TargetBox;