import { Outlet } from 'react-router-dom'
import Sidebar from '../../Library/Sidebar/Sidebar'
import useAuthRequired from '../../../hooks/utils/useAuthRequired'
import useLoadDashboard from '../../../hooks/actions/useLoadDashboard'

const Dashboard: React.FC = () => {
  useAuthRequired()
  useLoadDashboard()

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard
