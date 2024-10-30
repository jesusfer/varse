import { useState } from 'react'
import Sidebar from '../../Library/Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import VariableDisplay from './Variables/VariableDisplay/VariableDisplay'
import { Variable } from '../../../backend/types'
import VariableSearch from './Variables/VariableSearch/VariableSearch'
import VariableCreate from './Variables/VariableCreate/VariableCreate'
import useAuthRequired from '../../../hooks/useAuthRequired'

const Variables: React.FC = () => {
  useAuthRequired()

  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [createVariable, setCreateVariable] = useState(false)

  const selectedVariable = variables.find((v) => v.id === selectedKey)

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar tab={'vars'} />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Topbar
          selected={selectedVariable}
          unselect={() => setSelectedKey(null)}
        />
        <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
          {selectedVariable && <VariableDisplay variable={selectedVariable} />}
          {!selectedVariable && (
            <VariableSearch
              variables={variables}
              setSelectedKey={setSelectedKey}
              create={() => setCreateVariable(true)}
            />
          )}
        </div>
      </div>
      {createVariable && (
        <VariableCreate
          create={(name, value) => {
            console.log(name, value)
            setCreateVariable(false)
          }}
          close={() => setCreateVariable(false)}
        />
      )}
    </div>
  )
}

export default Variables

const variables: Variable[] = [{ id: '0', name: 'Var 1', value: 'true' }]
