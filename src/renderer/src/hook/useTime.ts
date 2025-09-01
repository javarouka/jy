import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useTime() {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date();
            setCurrentTime(format(now, 'HH:mm:ss'));
        }, 1000);

        const now = new Date();
        setCurrentDate(format(now, 'yyyy-MM-dd'));

        return () => clearInterval(timerId);
    }, []);

    return { currentDate, currentTime };
}
