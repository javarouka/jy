import MetaInformation from '@renderer/component/meta/MetaInformation'
import { Link, useLocation } from 'react-router-dom'
import MainTitle from '@renderer/component/basic/MainTitle'
import './AppBar.css'

export default function AppBar() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return currentPath === '/' || currentPath === ''
    }
    return currentPath.startsWith(path)
  }

  return (
    <div className="app-bar-container border-b-1 border-b-gray-300">
      <MetaInformation />
      <header className="p-2 space-y-3">
        <MainTitle>임상심리전문가 수련관리 시스템</MainTitle>
        <nav className="space-x-10">
          <Link
            to="/"
            className={isActive('/') ? 'active-link' : ''}
          >
            통계
          </Link>
          <Link
            to="/management"
            className={isActive('/management') ? 'active-link' : ''}
          >
            활동관리
          </Link>
          <Link
            to="/overview"
            className={isActive('/overview') ? 'active-link' : ''}
          >
            둘러보기
          </Link>
          <Link
            to="/config"
            className={isActive('/config') ? 'active-link' : ''}
          >
            설정
          </Link>
        </nav>
      </header>
    </div>
  )
}
