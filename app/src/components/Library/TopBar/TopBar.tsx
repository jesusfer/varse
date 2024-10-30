interface TopBarProps {
  children: React.ReactNode
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  return (
    <div className="w-full h-[60px] p-4 gap-3 flex items-center bg-panel-background border-b border-panel-border flex-shrink-0">
      {children}
    </div>
  )
}

export default TopBar
