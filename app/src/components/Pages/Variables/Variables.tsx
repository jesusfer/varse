import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../Library/Sidebar/Sidebar'
import Topbar from './Topbar/Topbar'
import VariableDisplay from './Variables/VariableDisplay/VariableDisplay'
import { Variable } from '../../../backend/types'
import VariableSearch from './Variables/VariableSearch/VariableSearch'
import VariableCreatePopup from './Variables/VariableCreatePopup/VariableCreatePopup'
import useAuthRequired from '../../../hooks/useAuthRequired'
import useNav from '../../../hooks/useNav'

const Variables: React.FC = () => {
  useAuthRequired()
  const { variableId } = useParams()
  const nav = useNav()

  const [createVariable, setCreateVariable] = useState(false)

  const selectedVariable = variables.find((v) => v.id === variableId)

  const handleSelect = (key: string) => nav('variables', key)
  const handleUnselect = () => nav('variables')

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar tab={'vars'} />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Topbar selected={selectedVariable} unselect={handleUnselect} />
        <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
          {selectedVariable && <VariableDisplay variable={selectedVariable} />}
          {!selectedVariable && (
            <VariableSearch
              variables={variables}
              setSelectedKey={handleSelect}
              create={() => setCreateVariable(true)}
            />
          )}
        </div>
      </div>
      <VariableCreatePopup
        isOpen={createVariable}
        create={(name, value) => {
          console.log(name, value)
          setCreateVariable(false)
        }}
        onClose={() => setCreateVariable(false)}
      />
    </div>
  )
}

export default Variables

const variables: Variable[] = [{ id: '0', name: 'Var 1', value: 'true' }]
