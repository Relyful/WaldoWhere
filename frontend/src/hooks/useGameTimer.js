import { useEffect, useRef, useState } from "react";

export function useGameTimer() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setTimer(t => t + 1), 10);
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => clearInterval(intervalRef.current);

  return { timer, stopTimer, intervalRef };
}
