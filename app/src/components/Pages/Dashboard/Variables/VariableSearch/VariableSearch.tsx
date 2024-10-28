import { Search } from 'lucide-react'
import { useState } from 'react'
import VariableRow from './VariableRow/VariableRow'
import { Variable } from '../../../../../backend/types'
import VariableButton from '../VariableButton/VariableButton'

interface VariableSearchProps {
  variables: Variable[]
  setSelectedKey: (key: string) => void
}

const VariableSearch: React.FC<VariableSearchProps> = ({
  variables,
  setSelectedKey,
}) => {
  const [search, setSearch] = useState('')
  const [filteredVariables, setFilteredVariables] = useState(variables)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilteredVariables(
      variables.filter((variable) =>
        variable.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
  }

  return (
    <>
      <div className="w-[400px] flex items-center justify-start gap-4">
        <div className="w-full h-[40px] px-3 py-1 flex items-center justify-start gap-2 rounded-[6px] border border-panel-border">
          <Search size={16} className="text-text-2" />
          <input
            className="w-full h-full bg-transparent text-[14px] text-text-1 placeholder:text-text-2"
            type="text"
            placeholder="Search variables"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <VariableButton>Create Variable</VariableButton>
      </div>
      <div className="w-[400px] flex flex-col border border-panel-border rounded-[6px]">
        <div className="w-full p-3 flex items-center justify-start gap-3 border-b border-panel-border">
          <p className="text-[14px] text-text-2">Key</p>
        </div>
        <div className="w-full flex flex-col max-h-[300px] overflow-y-auto">
          {filteredVariables.map((variable, index) => (
            <VariableRow
              key={variable.id}
              name={variable.name}
              last={index === filteredVariables.length - 1}
              onClick={() => setSelectedKey(variable.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default VariableSearch
