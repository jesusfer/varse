interface VariableRowProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string
}

const VariableRow: React.FC<VariableRowProps> = ({ name, ...props }) => {
  return (
    <button
      {...props}
      className="w-full p-3 flex items-center justify-start hover:bg-input-active border-b border-panel-border"
    >
      <p className="text-[14px] text-text-1">{name}</p>
    </button>
  )
}

export default VariableRow
