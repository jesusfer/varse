interface VariableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string
}

const VariableButton: React.FC<VariableButtonProps> = ({
  children,
  textColor = 'text-text-1',
  ...props
}) => {
  return (
    <button
      className={`h-[40px] px-3 py-1 flex flex-none items-center justify-center gap-2 border border-panel-border rounded-[6px] bg-primary text-[14px] ${textColor}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default VariableButton
