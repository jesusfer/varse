import { useParams } from 'react-router-dom'
import useNav from '../../../hooks/useNav'
import TopBar from '../../Library/TopBar/TopBar'
import { ChevronRight } from 'lucide-react'
import VariableDisplay from './VariableDisplay/VariableDisplay'
import { Variable } from '../../../backend/types'

const VariableDetails: React.FC = () => {
  const { variableId } = useParams()
  const nav = useNav()

  const selectedVariable = variables.find((v) => v.id === variableId)

  return (
    <>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <TopBar>
          <h2
            className="text-[14px] text-text-2 cursor-pointer hover:text-text-1"
            onClick={() => nav('variable-list')}
          >
            Variables
          </h2>
          <ChevronRight size={12} className="text-text-2" />
          <p className="text-[14px] text-text-1">{selectedVariable?.name}</p>
        </TopBar>
        <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
          {selectedVariable && <VariableDisplay variable={selectedVariable} />}
        </div>
      </div>
    </>
  )
}

export default VariableDetails

const variables: Variable[] = [{ id: '0', name: 'Var 1', value: 'true' }]
