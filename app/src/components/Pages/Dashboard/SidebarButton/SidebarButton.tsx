interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  name: string

  active?: boolean
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full h-[32px] flex gap-2 px-2 items-center justify-start rounded-[6px] ${active ? 'bg-panel-border' : 'bg-transparent hover:bg-panel-border'}`}
    >
      {icon}
      <p className="text-[14px] text-text-1">{name}</p>
    </button>
  )
}

export default SidebarButton
