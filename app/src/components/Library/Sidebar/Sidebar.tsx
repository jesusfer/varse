import { Database, KeyRound, Rocket, User } from 'lucide-react'
import SidebarButton from '../SidebarButton/SidebarButton'
import useNav from '../../../hooks/useNav'
import { useLocation } from 'react-router-dom'
import { useActiveProject } from '../../../context/ProjectContext'

const Sidebar: React.FC = () => {
  const { activeProject } = useActiveProject()
  const navigate = useNav()
  const location = useLocation()

  const tab = getActiveTab(location.pathname)

  return (
    <div className="w-[240px] h-full py-4 flex flex-col flex-none items-start justify-start gap-4 bg-panel-background border-r border-panel-border">
      <div className="w-full py-2 px-3 gap-1.5 flex flex-col">
        <div className="w-full flex flex-col">
          <h2 className="text-[14px] text-text-1">
            {activeProject?.name || 'Loading...'}
          </h2>
          <p className="text-[10px] text-text-2">Free</p>
        </div>
      </div>
      <div className="w-full px-3 py-2 flex flex-col gap-1">
        <h3 className="text-[12px] font-semibold text-text-2">Data</h3>
        <SidebarButton
          icon={<Database size={16} className={'text-text-1'} />}
          name={'Variables'}
          active={tab === 'vars'}
          onClick={() => navigate('variable-list')}
        />
        <SidebarButton
          icon={<KeyRound size={16} className={'text-text-1'} />}
          name={'API Keys'}
          active={tab === 'api'}
          onClick={() => navigate('keys')}
        />
        <SidebarButton
          icon={<User size={16} className={'text-text-1'} />}
          name={'Account'}
          active={tab === 'account'}
          onClick={() => navigate('account')}
        />
        <SidebarButton
          icon={<Rocket size={16} className={'text-text-1'} />}
          name={'Docs'}
          onClick={() => navigate('docs.home')}
          external
        />
      </div>
    </div>
  )
}

const getActiveTab = (pathname: string): string | null => {
  if (pathname.startsWith('/variable')) return 'vars'
  if (pathname.startsWith('/keys')) return 'api'
  if (pathname.startsWith('/account')) return 'account'
  return null
}

export default Sidebar
