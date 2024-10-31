import { useRef } from 'react'
import NavButton from '../../NavButton/NavButton'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import { House, Plus } from 'lucide-react'
import { Project } from '../../../../backend/types'
import useActiveProject from '../../../../hooks/state/useActiveProject'
import useProjectList from '../../../../hooks/state/useProjectList'
import useProjectSelect from '../../../../hooks/actions/useProjectSelect'

interface ProjectPopupProps {
  open: boolean
  onClose: () => void
  openCreatePopup: () => void
  sourceRef: React.RefObject<HTMLDivElement>
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({
  open,
  onClose,
  openCreatePopup,
  sourceRef,
}) => {
  const activeProject = useActiveProject()
  const projectList = useProjectList()
  const selectProject = useProjectSelect()

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose, sourceRef)

  const handleCreate = () => {
    openCreatePopup()
    onClose()
  }

  const handleSelect = (project: Project) => {
    selectProject(project)
    onClose()
  }

  if (!open) return <></>

  return (
    <div
      className="absolute top-full w-full p-3 flex flex-col gap-1 bg-background border border-panel-border rounded-[6px] shadow-offset-md shadow-popupShadow z-[1]"
      ref={ref}
    >
      {projectList.map((project) => (
        <NavButton
          key={project.id}
          name={project.name}
          active={activeProject?.id === project.id}
          icon={<House size={16} className={'text-text-1'} />}
          onClick={() => handleSelect(project)}
        />
      ))}
      <NavButton
        name="New Project"
        icon={<Plus size={16} className={'text-text-1'} />}
        onClick={handleCreate}
      />
    </div>
  )
}

export default ProjectPopup
