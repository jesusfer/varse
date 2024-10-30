import { Outlet } from 'react-router-dom'
import Sidebar from '../../Library/Sidebar/Sidebar'
import useAuthRequired from '../../../hooks/useAuthRequired'
import { useEffect } from 'react'
import useProject from '../../../hooks/useProject'
import useNav from '../../../hooks/useNav'
import {
  ProjectProvider,
  useActiveProject,
} from '../../../context/ProjectContext'

const Dashboard: React.FC = () => {
  return (
    <ProjectProvider>
      <DashboardContent />
    </ProjectProvider>
  )
}

const DashboardContent: React.FC = () => {
  useAuthRequired()
  const navigate = useNav()
  const { getProjects } = useProject()
  const { setActiveProject } = useActiveProject()

  useEffect(() => {
    getProjects().then((projects) => {
      if (projects.length === 0) {
        navigate('first-project')
        return
      }
      setActiveProject(projects[0])
    })
  }, [getProjects, navigate, setActiveProject])

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard
