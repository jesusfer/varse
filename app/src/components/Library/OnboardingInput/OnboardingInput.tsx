interface OnboardingInputProps {
  label: string

  value: string
  type: string
  placeholder: string

  onChange: (value: string) => void
}

const OnboardingInput: React.FC<OnboardingInputProps> = ({
  label,
  placeholder,
  value,
  type,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label className="text-text-1 text-[14px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[36px] px-4 rounded-md border border-panel-border text-text-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default OnboardingInput
