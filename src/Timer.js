import React, {useEffect, useState} from "react";

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [timerId, setTimerId] = useState(null);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const startTimer = (timeInSeconds) => {
        if (timerId) {
            clearInterval(timerId);
        }

        setSeconds(timeInSeconds);
        const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setTimerId(id);
    };

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(timerId);
        }
    }, [seconds, timerId]);

    return (
        <div>
            <input
                type="text"
                placeholder="Введите время в секундах"
                value={seconds <= 0 ? '' : seconds}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value)) {
                        setSeconds(parseInt(value, 10));
                    }
                }}
            />
            <button onClick={() => startTimer(seconds)}>Старт</button>
            <span>{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;