import { useState } from 'react'
import { Search } from 'lucide-react'
import useNav from '../../../hooks/utils/useNav'
import Button from '../../Library/Button/Button'
import ShareButton from '../../Library/ShareButton/ShareButton'
import TopBar from '../../Library/TopBar/TopBar'
import GroupPopup from './GroupPopup/GroupPopup'
import VariableCreatePopup from './VariableCreatePopup/VariableCreatePopup'
import VariableTable from './VariableTable/VariableTable'
import useLoadDashboard from '../../../hooks/actions/useLoadDashboard'
import useGroupCreate from '../../../hooks/actions/useGroupCreate'
import useGroupUpdate from '../../../hooks/actions/useGroupUpdate'
import useVariableCreate from '../../../hooks/actions/useVariableCreate'
import useGroupList from '../../../hooks/state/useGroupList'
import useVariableList from '../../../hooks/state/useVariableList'

const VariableList: React.FC = () => {
  useLoadDashboard()

  const navigate = useNav()
  const createGroup = useGroupCreate()
  const updateGroup = useGroupUpdate()
  const createVariable = useVariableCreate()
  const groupList = useGroupList()
  const variableList = useVariableList()

  const [search, setSearch] = useState('')

  const [openCreateGroupPopup, setOpenCreateGroupPopup] = useState(false)
  const [isGroupUpdate, setIsGroupUpdate] = useState(false)
  const [updatedGroupId, setUpdatedGroupId] = useState('')
  const [updatedGroupName, setUpdatedGroupName] = useState('')

  const [openCreateVariablePopup, setOpenCreateVariablePopup] = useState(false)

  const handleCreateGroup = async (name: string) => {
    await createGroup(name)
    setOpenCreateGroupPopup(false)
  }

  const handleUpdateGroup = async (name: string) => {
    await updateGroup(updatedGroupId, name)
    setOpenCreateGroupPopup(false)
    setIsGroupUpdate(false)
    setUpdatedGroupId('')
    setUpdatedGroupName('')
  }

  const handleCreateVariable = async (
    groupId: string,
    key: string,
    value: string,
  ) => {
    await createVariable(groupId, key, value)
    setOpenCreateVariablePopup(false)
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">Variables</h2>
        <ShareButton />
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
                placeholder="Search variables"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setOpenCreateVariablePopup(true)}
            >
              Create Variable
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenCreateGroupPopup(true)}
            >
              Create Group
            </Button>
          </div>
          <VariableTable
            groups={groupList}
            variableList={variableList}
            search={search}
            onSelect={(key) => navigate('variable-details', key)}
            openUpdateGroupPopup={(groupId: string, currentName: string) => {
              setUpdatedGroupId(groupId)
              setUpdatedGroupName(currentName)
              setIsGroupUpdate(true)
              setOpenCreateGroupPopup(true)
            }}
          />
        </div>
      </div>
      <VariableCreatePopup
        isOpen={openCreateVariablePopup}
        onClose={() => setOpenCreateVariablePopup(false)}
        create={handleCreateVariable}
        groups={groupList}
      />
      <GroupPopup
        isOpen={openCreateGroupPopup}
        onClose={() => {
          setOpenCreateGroupPopup(false)
          setIsGroupUpdate(false)
          setUpdatedGroupId('')
          setUpdatedGroupName('')
        }}
        create={handleCreateGroup}
        isUpdate={isGroupUpdate}
        currentName={updatedGroupName}
        update={handleUpdateGroup}
      />
    </div>
  )
}

export default VariableList
