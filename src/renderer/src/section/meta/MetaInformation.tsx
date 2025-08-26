import { useLocation } from '@renderer/hook/useLocation'
import './MetaInformation.css'
import Box from '@renderer/component/Box'
import { useWeather } from '@renderer/hook/useWeather'
import Clock from './Clock'

function MetaInformation() {
  const { location, initialized } = useLocation()
  const { weather, isLoading } = useWeather(location, initialized)

  const renderWeather = () => {
    if (isLoading) return <span className="loading-icon">☀️</span>
    if (!weather) return '날씨 정보 없음'
    return `${weather.description}, ${weather.temperature}°C`
  }

  return (
    <Box className="meta-information-container">
      <Box className="info-item">{renderWeather()}</Box>
      <Box className="info-item">{location}</Box>
      <Clock />
    </Box>
  )
}

export default MetaInformation
