import { useState } from 'react'
import useLoggedIn from '../../../hooks/useLoggedIn'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import VariableDisplay from './Variables/VariableDisplay/VariableDisplay'

export type DashboardTab = 'vars' | 'api'

const Dashboard: React.FC = () => {
  useLoggedIn()

  const [tab, setTab] = useState<DashboardTab>('vars')

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="w-full h-full flex flex-col">
        <Topbar />
        <div className="w-full h-full p-8 gap-4 flex flex-col items-center justify-start">
          {tab === 'vars' && (
            <VariableDisplay
              variable={{
                key: 'test',
                name: 'Test',
                value: 'Test',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
