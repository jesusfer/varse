import { Variable } from '../../../../../backend/types'
import VariableButton from '../VariableButton/VariableButton'
import Table from './Table/Table'
import { useState } from 'react'
import TableHeader from './TableHeader/TableHeader'
import PendingTableRow from './PendingTableRow/PendingTableRow'
import PastTableRow from './PastTableRow/PastTableRow'

interface VariableDisplayProps {
  variable: Variable
}

const VariableDisplay: React.FC<VariableDisplayProps> = ({ variable }) => {
  const [editing, setEditing] = useState(false)
  const [pendingOpen, setPendingOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [editingValue, setEditingValue] = useState(variable.value)

  return (
    <div className="w-full max-w-[800px] flex flex-col items-start justify-start gap-8">
      <div className="w-full flex flex-col items-start justify-start gap-4">
        <div className="w-full flex items-center justify-between rounded-[6px] border border-panel-border">
          <div className="w-full h-[200px] p-3 border-r border-panel-border">
            <p className="text-[14px] text-text-1">{variable.key}</p>
          </div>
          <div
            className={`w-full h-[200px] rounded-r-[6px] ${
              editing ? 'p-[11px] border border-primary' : 'p-3'
            }`}
          >
            {!editing && (
              <p className="text-[14px] text-text-1">{variable.value}</p>
            )}
            {editing && (
              <textarea
                className="w-full h-full bg-transparent text-[14px] text-text-1 resize-none outline-none"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {!editing && (
            <VariableButton onClick={() => setEditing(!editing)}>
              Update Value
            </VariableButton>
          )}
          {editing && (
            <>
              <VariableButton
                className="text-positive"
                onClick={() => setEditing(false)}
              >
                Submit
              </VariableButton>
              <VariableButton
                className="text-destructive"
                onClick={() => setEditing(false)}
              >
                Discard
              </VariableButton>
            </>
          )}
        </div>
      </div>
      <Table>
        <TableHeader
          title="Pending"
          count={1}
          open={pendingOpen}
          onClick={() => setPendingOpen(!pendingOpen)}
        />
        {pendingOpen && (
          <PendingTableRow
            update={{
              key: 'test',
              name: 'test',
              currentValue: 'false',
              pendingValue: 'true',
              createdAt: new Date(),
            }}
            approve={() => {}}
            reject={() => {}}
          />
        )}
      </Table>
      <Table>
        <TableHeader
          title="Past"
          count={20}
          open={historyOpen}
          onClick={() => setHistoryOpen(!historyOpen)}
        />
        {historyOpen && (
          <PastTableRow
            history={{
              key: 'test',
              name: 'test',
              originalValue: 'false',
              updatedValue: 'true',
              createdAt: new Date(),
            }}
          />
        )}
      </Table>
      <VariableButton className="text-destructive">
        Delete Variable
      </VariableButton>
    </div>
  )
}

export default VariableDisplay
