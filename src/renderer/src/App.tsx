import { Route, Routes } from 'react-router-dom'
import Layout from '@renderer/component/layout/Layout'
import Home from '@renderer/pages/Home'
import NotFound from '@renderer/pages/NotFound'
import ManagementRoot from '@renderer/pages/management/ManagementRoot'
import Statistics from '@renderer/pages/statistics/Statistics'
import Overview from '@renderer/pages/overview/Overview'

export default function App(){
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Statistics />} />
          <Route path="/management" element={<ManagementRoot />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}
