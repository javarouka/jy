import MetaInformation from '@renderer/component/meta/MetaInformation'
import { Link } from 'react-router-dom'
import MainTitle from '@renderer/component/basic/MainTitle'
import './AppBar.css'

export default function AppBar() {
  return (
    <div className="app-bar-container border-b-1">
      <MetaInformation />
      <header className="p-2 space-y-3">
        <MainTitle>임상심리전문가 수련관리 시스템</MainTitle>
        <nav className="space-x-10">
          <Link to="/">둘러보기</Link>
          <Link to="/management">활동 관리</Link>
          <Link to="/statistics">통계</Link>
        </nav>
      </header>
    </div>
  )
}
