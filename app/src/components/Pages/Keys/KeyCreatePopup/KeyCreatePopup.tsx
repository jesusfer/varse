import { useRef, useState } from 'react'
import useClickOutside from '../../../../hooks/useClickOutside'
import Input from '../../../Library/Input/Input'
import Button from '../../../Library/Button/Button'

interface KeyCreatePopupProps {
  isOpen: boolean
  create: (name: string) => void
  onClose: () => void
}

const KeyCreatePopup: React.FC<KeyCreatePopupProps> = ({
  isOpen,
  create,
  onClose,
}) => {
  const [name, setName] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[12px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">
          Create API Key
        </h1>
        <div className="w-full flex flex-col items-center gap-4">
          <Input
            label="Name"
            value={name}
            type="text"
            placeholder="my-api-key"
            onChange={(value) => setName(value)}
          />
        </div>
        <Button onClick={() => create(name)}>Create Key</Button>
      </div>
    </div>
  )
}

export default KeyCreatePopup
