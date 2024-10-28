import { PendingVariable } from '../../../../../../backend/types'
import { ChevronRight } from 'lucide-react'
import VariableButton from '../../VariableButton/VariableButton'

interface PendingTableRowProps {
  update: PendingVariable
  approve: () => void
  reject: () => void
}

const PendingTableRow: React.FC<PendingTableRowProps> = ({
  update,
  approve,
  reject,
}) => {
  return (
    <div className="w-full h-16 p-3 flex items-center justify-center gap-3">
      <div className="w-full flex items-center justify-center gap-3">
        <p className="w-[180px] flex-none text-[14px] text-text-1">
          {update.currentValue}
        </p>
        <ChevronRight size={16} className="text-text-1 flex-none" />
        <p className="w-full text-[14px] text-text-1">{update.pendingValue}</p>
      </div>
      <VariableButton onClick={approve} textColor="text-positive">
        Approve
      </VariableButton>
      <VariableButton onClick={reject} textColor="text-destructive">
        Reject
      </VariableButton>
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
  )
}

export default PendingTableRow
