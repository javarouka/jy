import { useState, useEffect } from 'react';

const descriptions: { [key: number]: string } = {
    0: '맑음',
    1: '대체로 맑음',
    2: '부분적으로 흐림',
    3: '흐림',
    45: '안개',
    48: '서리 안개',
    51: '가벼운 이슬비',
    53: '보통 이슬비',
    55: '짙은 이슬비',
    61: '가벼운 비',
    63: '보통 비',
    65: '폭우',
    80: '가벼운 소나기',
    81: '보통 소나기',
    82: '강한 소나기',
    95: '뇌우',
};

const getWeatherDescription = (code: number) => {
    return descriptions[code] || `what city?? ${code}`;
};

interface WeatherData {
    temperature: number;
    description: string;
}

export function useWeather(location: string | null, initialized: boolean) {

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (location === null || !initialized) {
            return;
        }
        // 위치 정보가 "서울, KR" 형식이므로 도시 이름만 추출
        const city = location.split(',')[0];
        // const city = 'Seoul';
        console.log(city, ',', location)
        // 위치 정보가 유효할 때만 API 호출
        if (!city) {
            return;
        }

        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
                const geoData = await geoResponse.json();

                if (!geoData.results) {
                    setWeather(null);
                    return
                }

                const { latitude, longitude } = geoData.results[0];

                const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`);
                const weatherData = await weatherResponse.json();

                setWeather({
                    temperature: Math.round(weatherData.current.temperature_2m),
                    description: getWeatherDescription(weatherData.current.weather_code),
                });

            } catch (error) {
                console.error("weather data error", error);
                setWeather(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWeatherData().catch(console.error);
    }, [location, initialized]); // location이 변경될 때마다 날씨 정보를 다시 가져옴

    return { weather, isLoading };
}
