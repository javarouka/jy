import { useState, useEffect } from 'react';

export function useTime() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        const now = new Date();
        setCurrentDate(now.toLocaleDateString());

        return () => clearInterval(timerId);
    }, []);

    return { currentDate, currentTime };
}