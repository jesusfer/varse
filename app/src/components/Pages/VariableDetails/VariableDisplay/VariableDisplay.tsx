import { useState } from 'react'
import { Variable } from '../../../../backend/types'
import Button from '../../../Library/Button/Button'

interface VariableDisplayProps {
  variable: Variable
  handleUpdate: (id: string, value: string, groupId: string) => void
}

const VariableDisplay: React.FC<VariableDisplayProps> = ({
  variable,
  handleUpdate,
}) => {
  const [editing, setEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(variable.value)

  const cancelEditing = () => {
    setEditing(false)
    setEditingValue(variable.value)
  }

  const submitUpdate = async () => {
    await handleUpdate(variable.id, editingValue, variable.groupId)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitUpdate()
    }
  }

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex items-center justify-between rounded-[6px] border border-panel-border">
        <div className="w-full h-[100px] p-3 border-r border-panel-border">
          <p className="text-[14px] text-text-1">{variable.key}</p>
        </div>
        <div
          className={`w-full h-[100px] rounded-r-[6px] ${
            editing ? 'p-[11px] border border-primary' : 'p-3'
          }`}
        >
          {!editing && (
            <p className="text-[14px] text-text-1">{variable.value}</p>
          )}
          {editing && (
            <textarea
              autoFocus
              onFocus={(e) => {
                const length = e.target.value.length
                e.target.setSelectionRange(0, length)
              }}
              className="w-full h-full bg-transparent text-[14px] text-text-1 resize-none outline-none"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onKeyDown={handleKeyDown}
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
              onClick={submitUpdate}
            >
              Submit
            </Button>
            <Button
              className="!text-destructive"
              variant="outline"
              onClick={cancelEditing}
            >
              Discard
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default VariableDisplay
