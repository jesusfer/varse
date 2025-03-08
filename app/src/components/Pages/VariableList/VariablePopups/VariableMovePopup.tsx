import { useRef, useState } from 'react'
import { Group } from '../../../../backend/types'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import Button from '../../../Library/Button/Button'
import Select from '../../../Library/Select/Select'

interface VariableMovePopupProps {
  isOpen: boolean
  move: (variableId: string) => void
  onClose: () => void
  groups: Group[]
}

const VariableMovePopup: React.FC<VariableMovePopupProps> = ({
  isOpen,
  move,
  onClose,
  groups,
}) => {
  const [newGroup, setNewGroup] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {
    setNewGroup('')
    onClose()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    move(newGroup)
    setNewGroup('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[6px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">Move variable</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <Select
              label="Move to"
              options={groups.map((g) => {
                return {
                  key: g.id,
                  value: g.name,
                }
              })}
              // value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default VariableMovePopup
