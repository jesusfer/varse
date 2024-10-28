import { Search } from 'lucide-react'
import { useState } from 'react'
import VariableRow from './VariableRow/VariableRow'
import { Variable } from '../../../../backend/types'

const VariableSelect: React.FC = () => {
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
        <button className="h-[40px] px-3 py-1 flex flex-none items-center justify-center gap-2 border border-panel-border rounded-[6px] bg-primary text-[14px] text-text-1">
          Create Variable
        </button>
      </div>
      <div className="w-[400px] flex flex-col border border-panel-border rounded-[6px]">
        <div className="w-full p-3 flex items-center justify-start gap-3 border-b border-panel-border">
          <p className="text-[14px] text-text-2">Key</p>
        </div>
        <div className="w-full flex flex-col max-h-[300px] overflow-y-auto">
          {filteredVariables.map((variable, index) => (
            <VariableRow
              key={variable.key}
              name={variable.name}
              last={index === filteredVariables.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default VariableSelect

const variables: Variable[] = [
  { key: '0', name: 'Var 1' },
  { key: '1', name: 'Var 2' },
  { key: '2', name: 'Var 3' },
  { key: '3', name: 'Var 4' },
  { key: '4', name: 'Var 5' },
  { key: '5', name: 'Var 6' },
  { key: '6', name: 'Var 7' },
  { key: '7', name: 'Var 8' },
  { key: '8', name: 'Var 9' },
  { key: '9', name: 'Var 10' },
]
