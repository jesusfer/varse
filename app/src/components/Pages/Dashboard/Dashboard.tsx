import { Outlet } from 'react-router-dom'
import Sidebar from '../../Library/Sidebar/Sidebar'
import useAuthRequired from '../../../hooks/useAuthRequired'
import { useEffect, useState } from 'react'
import { Project } from '../../../backend/types'
import useProject from '../../../hooks/useProject'
import useNav from '../../../hooks/useNav'

const Dashboard: React.FC = () => {
  useAuthRequired()
  const navigate = useNav()
  const { getProjects } = useProject()

  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    getProjects().then((projects) => {
      if (projects.length === 0) {
        navigate('first-project')
        return
      }
      setActiveProject(projects[0])
    })
  }, [getProjects, navigate])

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar activeProject={activeProject} />
      <Outlet />
    </div>
  )
}

export default Dashboard
