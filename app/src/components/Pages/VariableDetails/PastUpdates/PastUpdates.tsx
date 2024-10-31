import { ChevronRight, ChevronUp } from 'lucide-react'
import { HistoryVariable } from '../../../../backend/types'

interface PastUpdatesProps {
  history: HistoryVariable[]
  isOpen: boolean
  onToggle: () => void
}

const PastUpdates: React.FC<PastUpdatesProps> = ({
  history,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-between rounded-[6px] border border-panel-border">
      <div
        className={`w-full p-3 flex items-center justify-start gap-3 cursor-pointer select-none hover:bg-input-active ${isOpen ? 'border-b border-panel-border' : ''}`}
        onClick={onToggle}
      >
        <p
          className={`w-full text-[14px] ${isOpen ? 'text-text-1' : 'text-text-2'}`}
        >
          Past ({history.length})
        </p>
        <ChevronUp
          size={16}
          className={`text-text-2 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {isOpen &&
        history.map((item) => (
          <div
            key={item.id}
            className="w-full h-16 p-3 flex items-spaced justify-center"
          >
            <div className="w-full flex items-center justify-center gap-3">
              <p className="w-[180px] flex-none text-[14px] text-text-1">
                {item.originalValue}
              </p>
              <ChevronRight size={16} className="text-text-1 flex-none" />
              <p className="w-full text-[14px] text-text-1">
                {item.updatedValue}
              </p>
            </div>
            <div className="flex flex-col flex-none items-start justify-center">
              <p className="text-[12px] text-text-2">User Name</p>
              <p className="text-[12px] text-text-2">
                {item.createdAt.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                }) +
                  ' - ' +
                  item.createdAt
                    .toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                    .toLowerCase()}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PastUpdates
