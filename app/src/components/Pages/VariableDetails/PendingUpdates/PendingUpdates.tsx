import { ChevronRight, ChevronUp } from 'lucide-react'
import Button from '../../../Library/Button/Button'
import { PendingVariable } from '../../../../backend/types'

interface PendingUpdatesProps {
  updates: PendingVariable[]
  isOpen: boolean
  onToggle: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

const PendingUpdates: React.FC<PendingUpdatesProps> = ({
  updates,
  isOpen,
  onToggle,
  onApprove,
  onReject,
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
          Pending ({updates.length})
        </p>
        <ChevronUp
          size={16}
          className={`text-text-2 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {isOpen &&
        updates.map((update) => (
          <div
            key={update.id}
            className="w-full h-16 p-3 flex items-center justify-center gap-3"
          >
            <div className="w-full flex items-center justify-center gap-3">
              <p className="w-[180px] flex-none text-[14px] text-text-1">
                {update.currentValue}
              </p>
              <ChevronRight size={16} className="text-text-1 flex-none" />
              <p className="w-full text-[14px] text-text-1">
                {update.pendingValue}
              </p>
            </div>
            <Button
              className="!text-positive"
              variant="outline"
              onClick={() => onApprove(update.id)}
            >
              Approve
            </Button>
            <Button
              className="!text-destructive"
              variant="outline"
              onClick={() => onReject(update.id)}
            >
              Reject
            </Button>
            <div className="flex flex-col flex-none items-start justify-center">
              <p className="text-[12px] text-text-2">User Name</p>
              <p className="text-[12px] text-text-2">
                {update.createdAt.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                }) +
                  ' - ' +
                  update.createdAt
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

export default PendingUpdates
