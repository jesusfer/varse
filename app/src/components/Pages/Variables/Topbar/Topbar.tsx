import { ChevronRight } from 'lucide-react'
import { Variable } from '../../../../backend/types'

interface TopbarProps {
  selected: Variable | undefined
  unselect: () => void
}

const Topbar: React.FC<TopbarProps> = ({ selected, unselect }) => {
  return (
    <div className="w-full h-[60px] p-4 flex items-center bg-panel-background border-b border-panel-border">
      <div className="w-full flex items-center justify-start gap-2">
        {selected && (
          <>
            <h2
              className="text-[14px] text-text-2 cursor-pointer"
              onClick={unselect}
            >
              Variables
            </h2>
            <ChevronRight size={12} className="text-text-2" />
            <p className="text-[14px] text-text-1">{selected.name}</p>
          </>
        )}
        {!selected && (
          <h2
            className="text-[14px] text-text-1 cursor-pointer"
            onClick={unselect}
          >
            Variables
          </h2>
        )}
      </div>
    </div>
  )
}

export default Topbar
