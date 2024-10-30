import { useRef, useState } from 'react'
import useClickOutside from '../../../../../hooks/useClickOutside'
import Button from '../../../../Library/Button/Button'

interface VariableCreateProps {
  create: (name: string, value: string) => void
  close: () => void
}

const VariableCreate: React.FC<VariableCreateProps> = ({ create, close }) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, close)

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[12px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">
          Create Variable
        </h1>
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <p className="text-[14px] text-text-1">Key</p>
            <input
              className="w-full h-[36px] px-3 py-1 bg-transparent border border-panel-border rounded-[6px] text-[14px] text-text-1 placeholder:text-text-2"
              type="text"
              placeholder="variable_key"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <p className="text-[14px] text-text-1">Value</p>
            <input
              className="w-full h-[36px] px-3 py-1 bg-transparent border border-panel-border rounded-[6px] text-[14px] text-text-1 placeholder:text-text-2"
              type="text"
              placeholder="true"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => create(name, value)}>Submit</Button>
      </div>
    </div>
  )
}

export default VariableCreate
