import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  // TODO 1: Declara los estados timeLeft e isRunning
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  // TODO 2: Declara intervalRef con useRef
  const intervalRef = useRef(null);


  // TODO 3: Implementa el useEffect para el timer

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        }, 1000);
    }

    if (timeLeft === 0) {
        setIsRunning(false);
    }

    return () => {
        clearInterval(intervalRef.current);
    };
    }, [isRunning, timeLeft]);

  // TODO 4: Funcion formatTime(seconds) => "MM:SS"
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };


  // TODO 5: Funciones toggleTimer y resetTimer
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
    };

    const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
    };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>{formatTime(timeLeft)}</h1>

    <button onClick={toggleTimer}>
      {isRunning ? "Pausar" : "Iniciar"}
    </button>

    <button onClick={resetTimer} style={{ marginLeft: "10px" }}>
      Reiniciar
    </button>
  </div>
  );
}

export default Pomodoro;