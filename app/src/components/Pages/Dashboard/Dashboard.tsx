import { Outlet } from 'react-router-dom'
import Sidebar from '../../Library/Sidebar/Sidebar'
import useAuthRequired from '../../../hooks/utils/useAuthRequired'
import useLoadProjectList from '../../../hooks/data/useLoadProjectList'
import useLoadProject from '../../../hooks/data/useLoadProject'
import useLoadUser from '../../../hooks/data/useLoadUser'

const Dashboard: React.FC = () => {
  useAuthRequired()

  useLoadUser()
  useLoadProjectList()
  useLoadProject()

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard
