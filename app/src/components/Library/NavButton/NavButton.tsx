import { ChevronDown, ExternalLink } from 'lucide-react'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  name: string

  active?: boolean
  external?: boolean
  dropdown?: boolean
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  name,
  active,
  external,
  dropdown,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full h-[32px] flex gap-2 p-1 pr-2 items-center justify-start rounded-[6px] ${active ? 'bg-input-active' : 'bg-transparent hover:bg-panel-border'} ${className || ''}`}
    >
      {icon && (
        <div className="p-1 flex items-center justify-center">{icon}</div>
      )}
      <p className="text-[14px] text-text-1">{name}</p>
      {external && <ExternalLink className="ml-auto w-3 h-3 text-text-2" />}
      {dropdown && <ChevronDown className="w-3 h-3 text-text-2" />}
    </button>
  )
}

export default NavButton
