import {
  Database,
  FileText,
  House,
  KeyRound,
  Settings,
  User,
} from 'lucide-react'
import NavButton from '../NavButton/NavButton'
import useNav from '../../../hooks/utils/useNav'
import { useRef, useState } from 'react'
import ProjectPopup from './ProjectPopup/ProjectPopup'
import ProjectCreatePopup from './ProjectCreatePopup/ProjectCreatePopup'
import useProjectCreate from '../../../hooks/actions/useProjectCreate'
import useActiveProject from '../../../hooks/state/useActiveProject'
import useCurrentPage from '../../../hooks/utils/useCurrentPage'

const Sidebar: React.FC = () => {
  const activeProject = useActiveProject()
  const createProject = useProjectCreate()
  const navigate = useNav()
  const currentPage = useCurrentPage()

  const sourceRef = useRef<HTMLDivElement>(null)
  const [openProjectPopup, setOpenProjectPopup] = useState(false)
  const [openProjectCreatePopup, setOpenProjectCreatePopup] = useState(false)

  return (
    <div className="w-[240px] h-full py-4 flex flex-col flex-none items-start justify-start gap-4 bg-panel-background border-r border-panel-border">
      <div className="w-full py-2 px-3 gap-1.5 flex flex-col">
        <div ref={sourceRef} className="relative w-full flex flex-col">
          <NavButton
            name={activeProject?.name || 'Loading...'}
            icon={<House size={16} className={'text-text-1'} />}
            onClick={() => setOpenProjectPopup((prev) => !prev)}
            dropdown
          />
          <ProjectPopup
            open={openProjectPopup}
            onClose={() => setOpenProjectPopup(false)}
            openCreatePopup={() => setOpenProjectCreatePopup(true)}
            sourceRef={sourceRef}
          />
          <ProjectCreatePopup
            isOpen={openProjectCreatePopup}
            create={createProject}
            onClose={() => setOpenProjectCreatePopup(false)}
          />
        </div>
      </div>
      <div className="w-full px-3 py-2 flex flex-col gap-1">
        <h3 className="text-[12px] font-semibold text-text-2">Dashboard</h3>
        <NavButton
          icon={<Database size={16} className={'text-text-1'} />}
          name={'Variables'}
          active={
            currentPage === 'variable-list' ||
            currentPage === 'variable-details'
          }
          onClick={() => navigate('variable-list')}
        />
        <NavButton
          icon={<KeyRound size={16} className={'text-text-1'} />}
          name={'API Keys'}
          active={currentPage === 'keys'}
          onClick={() => navigate('keys')}
        />
        <NavButton
          icon={<Settings size={16} className={'text-text-1'} />}
          name={'Admin'}
          active={currentPage === 'admin'}
          onClick={() => navigate('admin')}
        />
        <NavButton
          icon={<User size={16} className={'text-text-1'} />}
          name={'Account'}
          active={currentPage === 'account'}
          onClick={() => navigate('account')}
        />
        <NavButton
          icon={<FileText size={16} className={'text-text-1'} />}
          name={'Docs'}
          onClick={() => navigate('docs')}
          external
        />
      </div>
    </div>
  )
}

export default Sidebar
