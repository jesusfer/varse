import { useState } from 'react'
import useLoggedIn from '../../../hooks/useLoggedIn'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import VariableDisplay from './Variables/VariableDisplay/VariableDisplay'
import { Variable } from '../../../backend/types'
import VariableSearch from './Variables/VariableSearch/VariableSearch'

export type DashboardTab = 'vars' | 'api'

const Dashboard: React.FC = () => {
  useLoggedIn()

  const [tab, setTab] = useState<DashboardTab>('vars')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const selectedVariable = variables.find((v) => v.id === selectedKey)

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="w-full h-full flex flex-col">
        <Topbar
          selected={selectedVariable}
          unselect={() => setSelectedKey(null)}
        />
        <div className="w-full h-full p-8 gap-4 flex flex-col items-center justify-start">
          {tab === 'vars' && (
            <>
              {selectedVariable && (
                <VariableDisplay variable={selectedVariable} />
              )}
              {!selectedVariable && (
                <VariableSearch
                  variables={variables}
                  setSelectedKey={setSelectedKey}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

const variables: Variable[] = [
  { id: '0', name: 'Var 1', value: 'true' },
  { id: '1', name: 'Var 2', value: 'true' },
  { id: '2', name: 'Var 3', value: 'true' },
  { id: '3', name: 'Var 4', value: 'true' },
  { id: '4', name: 'Var 5', value: 'true' },
  { id: '5', name: 'Var 6', value: 'true' },
  { id: '6', name: 'Var 7', value: 'true' },
  { id: '7', name: 'Var 8', value: 'true' },
  { id: '8', name: 'Var 9', value: 'true' },
  { id: '9', name: 'Var 10', value: 'true' },
]
