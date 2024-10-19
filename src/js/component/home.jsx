import React, { useEffect, useState } from "react";

// Función para formatear los segundos en horas, minutos y segundos
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Formatea para que las horas, minutos y segundos sean siempre dos dígitos
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Home = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [hoursInput, setHoursInput] = useState("00");
    const [minutesInput, setMinutesInput] = useState("00");
    const [secondsInput, setSecondsInput] = useState("00");

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const stopCounter = () => {
        setIsActive(false);
    };

    const resetCounter = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const resumeCounter = () => {
        setIsActive(true);
    };

    const startWithInput = () => {
        const totalSeconds = Number(hoursInput) * 3600 + Number(minutesInput) * 60 + Number(secondsInput);
        setSeconds(totalSeconds);
        setIsActive(true);
    };

    const handleInputChange = (setter) => (e) => {
        const value = e.target.value.padStart(2, "0"); // Asegura que siempre tenga 2 dígitos
        setter(value);
    };

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">Custom Time Counter</h1>
            <p>
                <h2>{formatTime(seconds)}</h2>
            </p>

            {/* Inputs centrados para horas, minutos y segundos */}
            <div className="d-flex justify-content-center align-items-center mt-3">
                <div className="text-center me-2">
                    <label>Horas</label>
                    <input
                        type="number"
                        className="form-control text-center"
                        style={{ width: '80px' }} // Asegura que tenga tamaño fijo
                        value={hoursInput}
                        onChange={handleInputChange(setHoursInput)}
                        min="0"
                        max="99"
                    />
                </div>
                <div className="text-center me-2">
                    <label>Minutos</label>
                    <input
                        type="number"
                        className="form-control text-center"
                        style={{ width: '80px' }}
                        value={minutesInput}
                        onChange={handleInputChange(setMinutesInput)}
                        min="0"
                        max="59"
                    />
                </div>
                <div className="text-center">
                    <label>Segundos</label>
                    <input
                        type="number"
                        className="form-control text-center"
                        style={{ width: '80px' }}
                        value={secondsInput}
                        onChange={handleInputChange(setSecondsInput)}
                        min="0"
                        max="59"
                    />
                </div>
            </div>

            {/* Botón para iniciar */}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={startWithInput}>
                    Start from Input
                </button>
            </div>

            {/* Botones de control */}
            <div className="buttons mt-3">
                <button className="btn btn-danger me-2" onClick={stopCounter}>Stop</button>
                <button className="btn btn-warning me-2" onClick={resetCounter}>Reset</button>
                <button className="btn btn-success me-2" onClick={resumeCounter}>Resume</button>
            </div>

            <p className="mt-5">
                Made by{" "}
                <a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with love!
            </p>
        </div>
    );
};

export default Home;