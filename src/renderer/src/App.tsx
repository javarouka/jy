import { Route, Routes } from 'react-router-dom'
import Layout from '@renderer/component/layout/Layout'
import Home from '@renderer/pages/Home'
import NotFound from '@renderer/pages/NotFound'
import ManagementRoot from '@renderer/pages/management/ManagementRoot'
import Statistics from '@renderer/pages/statistics/Statistics'

export default function App(){
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/management" element={<ManagementRoot />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}
