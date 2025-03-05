import { SelectHTMLAttributes } from 'react'

interface Options {
  key: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Options[]
}

const Select: React.FC<SelectProps> = ({ label, ...props }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label className="text-text-2 text-[14px]">{label}</label>
      <select
        {...props}
        className="w-full h-[36px] px-3 rounded-md border border-panel-border text-text-1 text-[14px]"
      >
        {props.options.length > 0 &&
          props.options.map((option, index) => (
            <option key={index} value="{option.key}">
              {option.value}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Select
