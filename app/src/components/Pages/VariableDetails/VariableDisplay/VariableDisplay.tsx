import Table from './Table/Table'
import { useState } from 'react'
import TableHeader from './TableHeader/TableHeader'
import PendingTableRow from './PendingTableRow/PendingTableRow'
import PastTableRow from './PastTableRow/PastTableRow'
import { Variable } from '../../../../backend/types'
import Button from '../../../Library/Button/Button'

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
            <p className="text-[14px] text-text-1">{variable.name}</p>
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
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              Update Value
            </Button>
          )}
          {editing && (
            <>
              <Button
                className="!text-positive"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Submit
              </Button>
              <Button
                className="!text-destructive"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Discard
              </Button>
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
              id: 'test',
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
              id: 'test',
              name: 'test',
              originalValue: 'false',
              updatedValue: 'true',
              createdAt: new Date(),
            }}
          />
        )}
      </Table>
      <Button className="!text-destructive" variant="outline">
        Delete Variable
      </Button>
    </div>
  )
}

export default VariableDisplay
