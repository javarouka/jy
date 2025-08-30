import { useLocation } from '@renderer/hook/useLocation'
import './MetaInformation.css'
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
    <div className="meta-information-container">
      <div className="info-item">{renderWeather()}</div>
      <div className="info-item">{location}</div>
      <Clock />
    </div>
  )
}

export default MetaInformation
