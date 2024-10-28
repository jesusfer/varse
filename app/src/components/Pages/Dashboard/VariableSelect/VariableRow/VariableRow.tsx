interface VariableRowProps extends React.HTMLAttributes<HTMLButtonElement> {
  key: string
  name: string

  last?: boolean
}

const VariableRow: React.FC<VariableRowProps> = ({
  key,
  name,
  last,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full p-3 flex items-center justify-start ${
        last ? '' : 'border-b border-panel-border'
      }`}
    >
      <p className="text-[14px] text-text-1">{name}</p>
    </button>
  )
}

export default VariableRow
