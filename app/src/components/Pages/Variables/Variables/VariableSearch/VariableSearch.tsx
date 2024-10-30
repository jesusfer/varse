import { Search } from 'lucide-react'
import { useState } from 'react'
import VariableRow from './VariableRow/VariableRow'
import { Variable } from '../../../../../backend/types'
import useNav from '../../../../../hooks/useNav'
import Button from '../../../../Library/Button/Button'

interface VariableSearchProps {
  variables: Variable[]
  setSelectedKey: (key: string) => void
  create: () => void
}

const VariableSearch: React.FC<VariableSearchProps> = ({
  variables,
  setSelectedKey,
  create,
}) => {
  const navigate = useNav()
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
        <Button variant="outline" onClick={create}>
          Create Variable
        </Button>
      </div>
      <div className="w-[400px] h-full border border-panel-border rounded-[6px] flex-shrink overflow-auto">
        <div className="sticky top-0 bg-background w-full p-3 flex items-center justify-start gap-3 border-b border-panel-border">
          <p className="text-[14px] text-text-2">Key</p>
        </div>
        {variables.length > 0 && (
          <div className="w-full flex flex-col overflow-y-auto">
            {filteredVariables.map((variable, index) => (
              <VariableRow
                key={variable.id}
                name={variable.name}
                onClick={() => setSelectedKey(variable.id)}
              />
            ))}
          </div>
        )}
        {variables.length > 0 && filteredVariables.length === 0 && (
          <div className="w-full flex items-center justify-start p-3">
            <p className="text-[14px] text-text-2">No variables found.</p>
          </div>
        )}
        {variables.length === 0 && (
          <div className="w-full flex items-center justify-between p-3">
            <p className="text-[14px] text-text-2">
              You don't have any variables yet.
            </p>
            <button
              className="text-[14px] text-cta-base cursor-pointer underline"
              onClick={() => navigate('docs.home')}
            >
              Quick Start
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default VariableSearch
