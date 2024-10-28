import { Book, Database, KeyRound, Pencil, Rocket } from 'lucide-react'
import SidebarButton from '../SidebarButton/SidebarButton'
import { DashboardTab } from '../Dashboard'

interface SidebarProps {
  tab: DashboardTab
  setTab: (tab: DashboardTab) => void
}

const Sidebar: React.FC<SidebarProps> = ({ tab, setTab }) => {
  return (
    <div className="w-[240px] h-full py-4 flex flex-col flex-none items-start justify-start gap-4 bg-panel-background border-r border-panel-border">
      <div className="w-full py-2 px-3 gap-1.5 flex flex-col">
        <div className="w-full flex flex-col">
          <h2 className="text-[14px] text-text-1">Project Name</h2>
          <p className="text-[10px] text-text-2">Free</p>
        </div>
      </div>
      <div className="w-full px-3 py-2 flex flex-col gap-1">
        <h3 className="text-[12px] font-semibold text-text-2">Data</h3>
        <SidebarButton
          icon={<Database size={16} className={'text-text-1'} />}
          name={'Variables'}
          active={tab === 'vars'}
          onClick={() => setTab('vars')}
        />
        <SidebarButton
          icon={<KeyRound size={16} className={'text-text-1'} />}
          name={'API Keys'}
          active={tab === 'api'}
          onClick={() => setTab('api')}
        />
      </div>
      <div className="w-full px-3 py-2 flex flex-col gap-1">
        <h3 className="text-[12px] font-semibold text-text-2">Docs</h3>
        <SidebarButton
          icon={<Rocket size={16} className={'text-text-1'} />}
          name={'Quick Start'}
        />
        <SidebarButton
          icon={<Book size={16} className={'text-text-1'} />}
          name={'Using Variables'}
        />
        <SidebarButton
          icon={<Pencil size={16} className={'text-text-1'} />}
          name={'Updating Variables'}
        />
      </div>
    </div>
  )
}

export default Sidebar
