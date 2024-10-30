import { Search } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import Button from '../../Library/Button/Button'
import KeyTable from './KeyTable/KeyTable'
import KeyCreatePopup from './KeyCreatePopup/KeyCreatePopup'
import TopBar from '../../Library/TopBar/TopBar'
import useProject from '../../../hooks/useProject'
import { useActiveProject } from '../../../context/ProjectContext'
import { ApiKey } from '../../../backend/types'

const Keys: React.FC = () => {
  const { createApiKey, getApiKeys, deleteApiKey } = useProject()
  const { activeProject } = useActiveProject()

  const [search, setSearch] = useState('')
  const [keys, setKeys] = useState<ApiKey[]>([])

  const filteredKeys = useMemo(() => {
    return keys.filter(
      (key) =>
        key.name.toLowerCase().includes(search.toLowerCase()) ||
        key.key.toLowerCase().includes(search.toLowerCase()),
    )
  }, [keys, search])

  const [creatingKey, setCreatingKey] = useState(false)

  useEffect(() => {
    if (!activeProject) return

    const fetchKeys = async () => {
      const fetchedKeys = await getApiKeys(activeProject.id)
      setKeys(fetchedKeys)
    }

    fetchKeys()
  }, [activeProject, getApiKeys])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCreateKey = async (name: string) => {
    if (!activeProject) return
    await createApiKey(activeProject.id, name)
    const updatedKeys = await getApiKeys(activeProject.id)
    setKeys(updatedKeys)
    setCreatingKey(false)
  }

  const handleDeleteKey = async (apiKeyId: string) => {
    if (!activeProject) return
    await deleteApiKey(activeProject.id, apiKeyId)
    const updatedKeys = await getApiKeys(activeProject.id)
    setKeys(updatedKeys)
  }

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
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" onClick={() => setCreatingKey(true)}>
              Create Key
            </Button>
          </div>
          <KeyTable
            keys={keys}
            filteredKeys={filteredKeys}
            onDelete={handleDeleteKey}
          />
          <KeyCreatePopup
            isOpen={creatingKey}
            create={handleCreateKey}
            onClose={() => setCreatingKey(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default Keys
