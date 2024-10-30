import { Copy, Search, Trash } from 'lucide-react'
import Sidebar from '../../Library/Sidebar/Sidebar'
import { useState } from 'react'
import Button from '../../Library/Button/Button'
import useNav from '../../../hooks/useNav'
import useAuthRequired from '../../../hooks/useAuthRequired'

const Keys: React.FC = () => {
  useAuthRequired()
  const navigate = useNav()

  const [search, setSearch] = useState('')
  const [filteredKeys, setFilteredKeys] = useState(keys)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilteredKeys(
      keys.filter((key) =>
        key.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
  }

  return (
    <div className="h-screen w-screen flex items-start justify-start bg-background">
      <Sidebar tab={'api'} />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="w-full h-[60px] p-4 flex items-center bg-panel-background border-b border-panel-border flex-shrink-0">
          <h2 className="text-[14px] text-text-1">API Keys</h2>
        </div>
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
            <div className="w-full max-w-[600px] h-[40px] flex items-center flex-shrink-0 gap-4">
              <div className="w-full h-[40px] px-3 py-1 flex items-center justify-start gap-2 rounded-[6px] border border-panel-border">
                <Search size={16} className="text-text-2" />
                <input
                  className="w-full h-full bg-transparent text-[14px] text-text-1 placeholder:text-text-2"
                  type="text"
                  placeholder="Search keys"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline">Create Key</Button>
            </div>
            <div className="w-full max-w-[600px] h-full border border-panel-border rounded-[6px] flex-shrink overflow-auto">
              <div className="sticky top-0 bg-background w-full p-3 flex items-center justify-between border-b border-panel-border">
                <div className="flex-1 flex items-center justify-end gap-3">
                  <p className="w-[140px] text-[14px] text-text-2">Name</p>
                  <p className="flex-1 text-[14px] text-text-2">Key</p>
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
                        <p className="w-[140px] text-[14px] text-text-1">
                          {key.name}
                        </p>
                        <p className="flex-1 text-[14px] text-text-1">
                          {key.key}
                        </p>
                        <p className="w-[140px] text-[14px] text-text-2">
                          {key.lastUsed.toLocaleDateString()}
                        </p>
                        <div
                          className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(key.key)}
                        >
                          <Copy size={16} />
                        </div>
                        <div className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Keys

type ApiKey = {
  id: string
  name: string
  key: string
  lastUsed: Date
}

const keys: ApiKey[] = [
  { id: '1', name: 'Key 1', key: '1234567890', lastUsed: new Date() },
  { id: '2', name: 'Key 2', key: '6789012345', lastUsed: new Date() },
]
