import { useParams } from 'react-router-dom'
import useNav from '../../../hooks/useNav'
import TopBar from '../../Library/TopBar/TopBar'
import { ChevronRight } from 'lucide-react'
import {
  HistoryVariable,
  PendingVariable,
  Variable,
} from '../../../backend/types'
import useProject from '../../../hooks/useProject'
import { useEffect, useState } from 'react'
import { useActiveProject } from '../../../context/ProjectContext'
import Button from '../../Library/Button/Button'
import PendingUpdates from './PendingUpdates/PendingUpdates'
import PastUpdates from './PastUpdates/PastUpdates'
import VariableDisplay from './VariableDisplay/VariableDisplay'

const VariableDetails: React.FC = () => {
  const { variableId } = useParams()
  const nav = useNav()
  const { getVariableById, deleteVariable, updateVariable } = useProject()
  const { activeProject } = useActiveProject()

  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null,
  )
  const [pendingOpen, setPendingOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)

  useEffect(() => {
    if (!variableId || !activeProject) return

    const fetchVariable = async () => {
      const variable = await getVariableById(activeProject.id, variableId)
      setSelectedVariable(variable)
    }

    fetchVariable()
  }, [variableId, getVariableById, activeProject])

  const handleDeleteVariable = async () => {
    if (!activeProject || !selectedVariable) return
    if (!selectedVariable) return
    await deleteVariable(activeProject.id, selectedVariable.id)
    nav('variable-list')
  }

  const handleUpdateVariable = async (id: string, value: string) => {
    if (!activeProject) return
    await updateVariable(activeProject.id, id, value)
    setSelectedVariable(await getVariableById(activeProject.id, id))
  }

  if (!selectedVariable) return null

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2
          className="text-[14px] text-text-2 cursor-pointer hover:text-text-1"
          onClick={() => nav('variable-list')}
        >
          Variables
        </h2>
        <ChevronRight size={12} className="text-text-2" />
        <p className="text-[14px] text-text-1">{selectedVariable.key}</p>
      </TopBar>
      <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
        <div className="w-full max-w-[800px] flex flex-col items-start justify-start gap-8">
          <VariableDisplay
            variable={selectedVariable}
            handleUpdate={handleUpdateVariable}
          />

          <PendingUpdates
            updates={PendingUpdateList}
            isOpen={pendingOpen}
            onToggle={() => setPendingOpen(!pendingOpen)}
            onApprove={() => {}}
            onReject={() => {}}
          />

          <PastUpdates
            history={HistoryList}
            isOpen={historyOpen}
            onToggle={() => setHistoryOpen(!historyOpen)}
          />

          <Button
            className="!text-destructive"
            variant="outline"
            onClick={handleDeleteVariable}
          >
            Delete Variable
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VariableDetails

const PendingUpdateList: PendingVariable[] = [
  {
    id: '1',
    key: 'key',
    createdAt: new Date(),
    currentValue: 'placeholder',
    pendingValue: 'value',
  },
  {
    id: '2',
    key: 'key',
    createdAt: new Date(),
    currentValue: 'placeholder',
    pendingValue: 'value',
  },
]
const HistoryList: HistoryVariable[] = [
  {
    id: '1',
    key: 'key',
    originalValue: 'placeholder',
    updatedValue: 'value',
    createdAt: new Date(),
  },
  {
    id: '2',
    key: 'key',
    originalValue: 'placeholder',
    updatedValue: 'value',
    createdAt: new Date(),
  },
]
