import { useState } from 'react'
import { Search } from 'lucide-react'
import { Variable } from '../../../backend/types'
import useNav from '../../../hooks/useNav'
import TopBar from '../../Library/TopBar/TopBar'
import Button from '../../Library/Button/Button'
import VariableCreatePopup from './VariableCreatePopup/VariableCreatePopup'
import VariableTable from './VariableTable/VariableTable'

const VariableList: React.FC = () => {
  const nav = useNav()
  const [search, setSearch] = useState('')
  const [filteredVariables, setFilteredVariables] = useState(variables)
  const [creatingVariable, setCreatingVariable] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilteredVariables(
      variables.filter((variable) =>
        variable.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">Variables</h2>
      </TopBar>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
          <div className="w-full max-w-[600px] h-[40px] flex items-center flex-shrink-0 gap-4">
            <div className="w-full h-[40px] px-3 py-1 flex items-center justify-start gap-2 rounded-[6px] border border-panel-border">
              <Search size={16} className="text-text-2" />
              <input
                className="w-full h-full bg-transparent text-[14px] text-text-1 placeholder:text-text-2"
                name="search"
                type="text"
                placeholder="Search variables"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" onClick={() => setCreatingVariable(true)}>
              Create Variable
            </Button>
          </div>
          <VariableTable
            variables={variables}
            filteredVariables={filteredVariables}
            onSelect={(key) => nav('variable-details', key)}
          />
        </div>
      </div>
      <VariableCreatePopup
        isOpen={creatingVariable}
        create={(name, value) => setCreatingVariable(false)}
        onClose={() => setCreatingVariable(false)}
      />
    </div>
  )
}

export default VariableList

const variables: Variable[] = [{ id: '0', name: 'Var 1', value: 'true' }]
