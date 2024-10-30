import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label className="text-text-2 text-[14px]">{label}</label>
      <input
        {...props}
        className="w-full h-[36px] px-3 rounded-md border border-panel-border text-text-1 text-[14px]"
      />
    </div>
  )
}

export default Input
