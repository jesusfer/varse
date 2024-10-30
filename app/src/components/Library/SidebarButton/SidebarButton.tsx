import { ExternalLink } from 'lucide-react'

interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  name: string

  active?: boolean
  external?: boolean
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  active,
  external,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full h-[32px] flex gap-2 px-2 items-center justify-start rounded-[6px] ${active ? 'bg-input-active' : 'bg-transparent hover:bg-panel-border'}`}
    >
      {icon}
      <p className="text-[14px] text-text-1">{name}</p>
      {external && <ExternalLink className="ml-auto w-4 h-4 text-text-2" />}
    </button>
  )
}

export default SidebarButton
