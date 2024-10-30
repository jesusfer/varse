import { createContext, useContext, ReactNode, useState } from 'react'
import { Project } from '../backend/types'

interface ProjectContextType {
  activeProject: Project | null
  setActiveProject: (project: Project | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useActiveProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useActiveProject must be used within a ProjectProvider')
  }
  return context
}
