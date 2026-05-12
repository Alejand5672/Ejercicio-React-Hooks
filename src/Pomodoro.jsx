import { useState, useEffect, useRef } from 'react';

const WORK_TIME = 1500; 
const BREAK_TIME = 300; 
function Pomodoro() {
  // TODO 1: Declara los estados timeLeft e isRunning
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [sessions, setSessions] = useState([]);
  


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

  useEffect(() => {
    if (timeLeft === 0) {

        if (mode === "work") {
        const newSession = {
            id: Date.now(),
            type: "work",
            duration: WORK_TIME,
            completedAt: new Date()
        };

        setSessions((prev) => [...prev, newSession]);
        }

        const newMode = mode === "work" ? "break" : "work";
        setMode(newMode);

        setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);

        setIsRunning(true);
    }
    }, [timeLeft]);  


  // TODO 5: Funciones toggleTimer y resetTimer
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
    };

    const resetTimer = () => {
      setIsRunning(false);
      setTimeLeft(WORK_TIME);
      setMode("work");
      setSessions([]);
    };

  return (
    <div className="container">
    <div className="card">

      <div className="mode">
        {mode === "work" ? "Trabajo" : "Descanso"}
      </div>

      <div className="timer">
        {formatTime(timeLeft)}
      </div>

      <div className="buttons">
        <button className="start" onClick={toggleTimer}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>

        <button className="reset" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>

      <ul className="sessions">
        {sessions.map((session, index) => (
          <li key={session.id}>
            #{index + 1} - {formatTime(session.duration)} -{" "}
            {session.completedAt.toLocaleTimeString()}
          </li>
        ))}
      </ul>

    </div>
  </div>
  );
}

export default Pomodoro;