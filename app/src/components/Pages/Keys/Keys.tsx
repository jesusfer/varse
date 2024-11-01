import { Search } from 'lucide-react'
import { useState } from 'react'
import Button from '../../Library/Button/Button'
import KeyTable from './KeyTable/KeyTable'
import KeyCreatePopup from './KeyCreatePopup/KeyCreatePopup'
import TopBar from '../../Library/TopBar/TopBar'
import useKeyList from '../../../hooks/state/useApiKeyList'
import useKeyCreate from '../../../hooks/actions/useKeyCreate'
import useKeyDelete from '../../../hooks/actions/useKeyDelete'
import useLoadDashboard from '../../../hooks/actions/useLoadDashboard'

const Keys: React.FC = () => {
  useLoadDashboard()

  const apiKeyList = useKeyList()
  const createApiKey = useKeyCreate()
  const deleteApiKey = useKeyDelete()

  const [search, setSearch] = useState('')
  const [creatingKey, setCreatingKey] = useState(false)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">API Keys</h2>
      </TopBar>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="w-full flex-1 p-8 gap-4 flex flex-col items-center justify-start overflow-auto">
          <div className="w-full max-w-[600px] h-[40px] flex items-center flex-shrink-0 gap-4">
            <div className="w-full h-[40px] px-3 py-1 flex items-center justify-start gap-2 rounded-[6px] border border-panel-border">
              <Search size={16} className="text-text-2" />
              <input
                className="w-full h-full bg-transparent text-[14px] text-text-1 placeholder:text-text-2"
                name="search"
                type="text"
                placeholder="Search keys"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setCreatingKey(true)}>
              Create Key
            </Button>
          </div>
          <KeyTable
            keyList={apiKeyList}
            search={search}
            onDelete={deleteApiKey}
          />
          <KeyCreatePopup
            isOpen={creatingKey}
            create={createApiKey}
            onClose={() => setCreatingKey(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default Keys
