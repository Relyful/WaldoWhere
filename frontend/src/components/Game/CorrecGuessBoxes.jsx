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
};

export default CorrectGuessBoxes;