import { HistoryVariable } from '../../../../../../backend/types'
import { ChevronRight } from 'lucide-react'

interface PastTableRowProps {
  history: HistoryVariable
}

const PastTableRow: React.FC<PastTableRowProps> = ({ history }) => {
  return (
    <div className="w-full h-16 p-3 flex items-spaced justify-center">
      <div className="w-full flex items-center justify-center gap-3">
        <p className="w-[180px] flex-none text-[14px] text-text-1">
          {history.originalValue}
        </p>
        <ChevronRight size={16} className="text-text-1 flex-none" />
        <p className="w-full text-[14px] text-text-1">{history.updatedValue}</p>
      </div>
      <div className="flex flex-col flex-none items-start justify-center">
        <p className="text-[12px] text-text-2">User Name</p>
        <p className="text-[12px] text-text-2">
          {history.createdAt.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          }) +
            ' - ' +
            history.createdAt
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

export default PastTableRow
