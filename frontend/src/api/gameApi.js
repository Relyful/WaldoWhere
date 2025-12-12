const backend = import.meta.env.VITE_backend_address || "http://localhost:8080";

export async function callGameStart(controller) {
  try {
    const response = await fetch(`${backend}/game/start`, {
      signal: controller.signal,
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error starting timer");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Start timer aborted");
      return;
    }
    console.error(error);
  }
}

export async function callGameGuess(x, y, name, signal, setCorrectGuesses) {
  try {
    const response = await fetch(`${backend}/guess`, {
      signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: x,
        y: y,
        character: name,
      }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error sending guess request game guess.");
    }
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.hit) {
      setCorrectGuesses((prevState) => [...prevState, { x, y, name }]);
    }
  } catch (error) {
    console.error(error);
  }
  return;
}

export async function callStopTimer() {
  try {
    const response = await fetch(`${backend}/game/stop`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error contacting server stop timer");
    }
  } catch (err) {
    console.error(err);
  }
}
