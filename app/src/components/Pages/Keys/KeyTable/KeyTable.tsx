import { Copy, Trash } from 'lucide-react'
import useNav from '../../../../hooks/useNav'
import { ApiKey } from '../../../../backend/types'

interface KeyTableProps {
  keys: ApiKey[]
  filteredKeys: ApiKey[]
  onDelete: (apiKeyId: string) => void
}

const KeyTable: React.FC<KeyTableProps> = ({
  keys,
  filteredKeys,
  onDelete,
}) => {
  const navigate = useNav()

  return (
    <div className="w-full max-w-[600px] h-full border border-panel-border rounded-[6px] flex-shrink overflow-auto">
      <div className="sticky top-0 bg-background w-full p-3 flex items-center justify-between border-b border-panel-border">
        <div className="flex-1 flex items-center justify-end gap-3">
          <p className="w-[140px] text-[14px] text-text-2">Name</p>
          <p className="w-[200px] text-[14px] text-text-2">Key</p>
          <p className="w-[140px] text-[14px] text-text-2">Last Used</p>
          <div className="w-4 h-4" />
          <div className="w-4 h-4" />
        </div>
      </div>
      {keys.length > 0 && (
        <div className="w-full flex flex-col overflow-y-auto">
          {filteredKeys.map((key) => (
            <div
              key={key.id}
              className="w-full p-3 flex items-center justify-between border-b border-panel-border"
            >
              <div className="flex-1 flex items-center justify-end gap-3">
                <p className="w-[140px] text-[14px] text-text-1">{key.name}</p>
                <p
                  className="w-[200px] text-[14px] text-text-1 truncate"
                  title={key.key}
                >
                  {key.key}
                </p>
                <p className="w-[140px] text-[14px] text-text-2">
                  {key.lastUsed ? key.lastUsed.toLocaleDateString() : 'Never'}
                </p>
                <div
                  className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(key.key)}
                >
                  <Copy size={16} />
                </div>
                <div
                  className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                  onClick={() => onDelete(key.id)}
                >
                  <Trash size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {keys.length > 0 && filteredKeys.length === 0 && (
        <div className="w-full flex items-center justify-start p-3">
          <p className="text-[14px] text-text-2">No keys found.</p>
        </div>
      )}
      {keys.length === 0 && (
        <div className="w-full flex items-center justify-between p-3">
          <p className="text-[14px] text-text-2">
            You don't have any API keys yet.
          </p>
          <button
            className="text-[14px] text-cta-base cursor-pointer underline"
            onClick={() => navigate('docs.home')}
          >
            Quick Start
          </button>
        </div>
      )}
    </div>
  )
}

export default KeyTable
