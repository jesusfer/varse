import { useRef, useState } from 'react'
import useClickOutside from '../../../../hooks/useClickOutside'
import Button from '../../../Library/Button/Button'
import Input from '../../../Library/Input/Input'

interface VariableCreatePopupProps {
  isOpen: boolean
  create: (name: string, value: string) => void
  onClose: () => void
}

const VariableCreatePopup: React.FC<VariableCreatePopupProps> = ({
  isOpen,
  create,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && value.trim()) create(name, value)
    setName('')
    setValue('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[12px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">
          Create Variable
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <Input
              label="Key"
              value={name}
              type="text"
              placeholder="variable_key"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <Input
              label="Value"
              value={value}
              type="text"
              placeholder="true"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default VariableCreatePopup
