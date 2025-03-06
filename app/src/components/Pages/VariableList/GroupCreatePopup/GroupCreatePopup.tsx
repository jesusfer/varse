import { useRef, useState } from 'react'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import Button from '../../../Library/Button/Button'
import Input from '../../../Library/Input/Input'

interface GroupCreatePopupProps {
  isOpen: boolean
  create: (name: string) => void
  onClose: () => void
}

const GroupCreatePopup: React.FC<GroupCreatePopupProps> = ({
  isOpen,
  create,
  onClose,
}) => {
  const [name, setName] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      create(name)
    }
    setName('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[6px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">Create group</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <Input
              label="Key"
              value={name}
              type="text"
              placeholder="Group name"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default GroupCreatePopup
