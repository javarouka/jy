import { useState, useEffect } from 'react';

export function useLocation() {
    const [location, setLocation] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();
                if (data.status === 'success') {
                    setLocation(`${data.regionName}, ${data.city} ${data.countryCode}`);
                } else {
                    setLocation(null);
                }
                setInitialized(true);
            } catch (error) {
                console.error("Error fetching location:", error);
                setLocation(null);
                setInitialized(true);
            }
        };
        fetchLocation().catch(console.error);
    }, []);

    return { location, initialized };
}