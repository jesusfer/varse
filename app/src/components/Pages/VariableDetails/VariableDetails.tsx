import { ChevronRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import useVariableDelete from '../../../hooks/actions/useVariableDelete'
import useVariableUpdate from '../../../hooks/actions/useVariableUpdate'
import useVariableList from '../../../hooks/state/useVariableList'
import useNav from '../../../hooks/utils/useNav'
import Button from '../../Library/Button/Button'
import ShareButton from '../../Library/ShareButton/ShareButton'
import TopBar from '../../Library/TopBar/TopBar'
import VariableDisplay from './VariableDisplay/VariableDisplay'

const VariableDetails: React.FC = () => {
  const { variableId } = useParams()

  const nav = useNav()
  const variableList = useVariableList()
  const deleteVariable = useVariableDelete()
  const updateVariable = useVariableUpdate()

  const selectedVariable = variableList.find((v) => v.id === variableId)

  if (!selectedVariable) return null

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <div className="flex items-center gap-3">
          <h2
            className="text-[14px] text-text-2 cursor-pointer hover:text-text-1"
            onClick={() => nav('variables')}
          >
            Variables
          </h2>
          <ChevronRight size={12} className="text-text-2" />
          <p className="text-[14px] text-text-1">{selectedVariable.key}</p>
        </div>
        <ShareButton />
      </TopBar>
      <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
        <div className="w-full max-w-[800px] flex flex-col items-start justify-start gap-8">
          <VariableDisplay
            variable={selectedVariable}
            handleUpdate={updateVariable}
          />

          <Button
            className="!text-destructive"
            variant="outline"
            onClick={() => deleteVariable(selectedVariable.id)}
          >
            Delete Variable
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VariableDetails
