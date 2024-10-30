import { Search } from 'lucide-react'
import Sidebar from '../../Library/Sidebar/Sidebar'
import { useState } from 'react'
import Button from '../../Library/Button/Button'
import useAuthRequired from '../../../hooks/useAuthRequired'
import KeyTable from './KeyTable/KeyTable'
import KeyCreatePopup from './KeyCreatePopup/KeyCreatePopup'

const Keys: React.FC = () => {
  useAuthRequired()

  const [search, setSearch] = useState('')
  const [filteredKeys, setFilteredKeys] = useState(keys)
  const [creatingKey, setCreatingKey] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilteredKeys(
      keys.filter(
        (key) =>
          key.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          key.key.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    )
  }

  const createKey = (name: string) => {
    console.log(name)
    setCreatingKey(false)
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
              <Button variant="outline" onClick={() => setCreatingKey(true)}>
                Create Key
              </Button>
            </div>
            <KeyTable keys={keys} filteredKeys={filteredKeys} />
            <KeyCreatePopup
              isOpen={creatingKey}
              create={createKey}
              onClose={() => setCreatingKey(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Keys

export type ApiKey = {
  id: string
  name: string
  key: string
  lastUsed: Date
}

const keys: ApiKey[] = [
  { id: '1', name: 'key_1', key: '1234567890', lastUsed: new Date() },
  { id: '2', name: 'key_2', key: '6789012345', lastUsed: new Date() },
]
