import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);

  const intervalRef = useRef(null);

  const totalTime = mode === "work" ? workMins * 60 : breakMins * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  //estadísticas
  const totalSessions = sessions.length;

  const workSessions = sessions.filter(s => s.type.includes("work"));
  const totalWorkMinutes = Math.floor(
    workSessions.reduce((acc, s) => acc + s.duration, 0) / 60
  );

  const breakSessions = sessions.filter(s => s.type.includes("break"));
  const totalBreakMinutes = Math.floor(
    breakSessions.reduce((acc, s) => acc + s.duration, 0) / 60
  );

  //timer
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  //cambio de modo
  useEffect(() => {
    if (timeLeft === 0) {
      const newSession = {
        id: Date.now(),
        type: mode,
        duration: totalTime,
        completedAt: new Date()
      };

      setSessions(prev => [...prev, newSession]);

      const newMode = mode === "work" ? "break" : "work";
      setMode(newMode);

      const newTime = newMode === "work" ? workMins * 60 : breakMins * 60;
      setTimeLeft(newTime);

      setIsRunning(true);
    }
  }, [timeLeft]);

  //sync inputs
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(totalTime);
    }
  }, [workMins, breakMins, mode, isRunning]);

  //sonido
  useEffect(() => {
    if (timeLeft === 0) {
      new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();
    }
  }, [timeLeft]);

  //persistencia
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  const toggleTimer = () => setIsRunning(prev => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setSessions([]);
    setTimeLeft(workMins * 60);
  };

  const savePartialSession = () => {
    const elapsed = totalTime - timeLeft;
    if (elapsed <= 0) return;

    setSessions(prev => [
      ...prev,
      {
        id: Date.now(),
        type: `${mode} (parcial)`,
        duration: elapsed,
        completedAt: new Date()
      }
    ]);
  };

  return (
      <div className="container">
    <div className="card">

      <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "20px" }}>
        
        <div style={{ textAlign: "center" }}>
          <label style={{ fontSize: "12px", color: "#aaa" }}>Trabajo</label>
          <input
            type="number"
            min="1"
            max="60"
            value={workMins}
            disabled={isRunning}
            onChange={(e) => setWorkMins(Number(e.target.value))}
            style={{
              width: "70px",
              padding: "6px",
              textAlign: "center",
              borderRadius: "10px",
              border: "1px solid #333",
              background: "#1a1d26",
              color: "white"
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <label style={{ fontSize: "12px", color: "#aaa" }}>Descanso</label>
          <input
            type="number"
            min="1"
            max="60"
            value={breakMins}
            disabled={isRunning}
            onChange={(e) => setBreakMins(Number(e.target.value))}
            style={{
              width: "70px",
              padding: "6px",
              textAlign: "center",
              borderRadius: "10px",
              border: "1px solid #333",
              background: "#1a1d26",
              color: "white"
            }}
          />
        </div>

      </div>

      <div className="mode">
        {mode === "work" ? "Trabajo" : "Descanso"}
      </div>

      <div className="timer">
        {formatTime(timeLeft)}
      </div>

      <div style={{
        width: "100%",
        height: "10px",
        background: "#2a2e3a",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "25px"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: mode === "work" ? "#ff5c5c" : "#4caf50",
          transition: "width 1s linear",
          boxShadow: mode === "work"
            ? "0 0 10px rgba(255, 92, 92, 0.7)"
            : "0 0 10px rgba(76, 175, 80, 0.7)"
        }} />
      </div>

      <div className="buttons">
        <button className="start" onClick={toggleTimer}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>

        <button className="reset" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={savePartialSession}
          style={{
            padding: "10px 15px",
            borderRadius: "10px",
            border: "none",
            background: "#3a3f4b",
            color: "white",
            cursor: "pointer"
          }}
        >
          Guardar sesión
        </button>
      </div>

      <ul className="sessions">
        {sessions.map((s, i) => (
          <li key={s.id}>
            #{i + 1} - {formatTime(s.duration)} -{" "}
            {new Date(s.completedAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#ccc" }}>
        <p>Total sesiones: {totalSessions}</p>
        <p>Trabajo: {totalWorkMinutes} min</p>
        <p>Descanso: {totalBreakMinutes} min</p>
      </div>

    </div>
  </div>
  );
}

export default Pomodoro;