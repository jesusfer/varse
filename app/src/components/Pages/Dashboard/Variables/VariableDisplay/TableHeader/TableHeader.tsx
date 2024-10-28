import { ChevronDown, ChevronUp } from 'lucide-react'

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  count: number
  open: boolean
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  count,
  open,
  ...props
}) => {
  return (
    <div
      className={`w-full p-3 flex items-center justify-start gap-3 cursor-pointer select-none ${open ? 'border-b border-panel-border' : ''}`}
      {...props}
    >
      <p className="w-full text-[14px] text-text-2">
        {title + ' (' + count + ')'}
      </p>
      {open && <ChevronDown size={24} className="text-text-2" />}
      {!open && <ChevronUp size={24} className="text-text-2" />}
    </div>
  )
}

export default TableHeader
