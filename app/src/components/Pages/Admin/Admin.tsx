import Button from '../../Library/Button/Button'
import TopBar from '../../Library/TopBar/TopBar'
import useProjectDelete from '../../../hooks/actions/useProjectDelete'
import useProjectUserList from '../../../hooks/state/useProjectUserList'
import { ProjectRole } from '../../../backend/types'
import useActiveProject from '../../../hooks/state/useActiveProject'
import useProjectUserDelete from '../../../hooks/actions/useProjectUserDelete'
import { Trash } from 'lucide-react'
import useUserInfo from '../../../hooks/state/useUserInfo'
import useLoadDashboard from '../../../hooks/actions/useLoadDashboard'

const Admin: React.FC = () => {
  useLoadDashboard()

  const activeProject = useActiveProject()
  const projectUserList = useProjectUserList()
  const userInfo = useUserInfo()

  const deleteProject = useProjectDelete()
  const deleteProjectUser = useProjectUserDelete()

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">Admin</h2>
      </TopBar>

      <div className="w-full h-full flex flex-col p-8 gap-3 items-center overflow-hidden">
        <div className="w-full max-w-[600px] flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold text-text-1">Project</h2>
            <div className="border border-panel-border rounded-[6px]">
              <div className="w-full px-3 py-3 gap-2 flex items-center border-b border-panel-border">
                <p className="text-[14px] text-text-1">Project Info</p>
              </div>
              <div className="w-full px-3 py-3 gap-3 flex flex-col">
                <div className="w-full gap-3 flex items-center justify-between">
                  <p className="w-[200px] text-[14px] text-text-2">
                    Project Name
                  </p>
                  <div className="px-3 py-3 flex-1 border border-panel-border rounded-[6px]">
                    <p className="text-[14px] text-text-1 truncate">
                      {activeProject?.name}
                    </p>
                  </div>
                </div>
                <div className="w-full gap-3 flex items-center justify-between">
                  <p className="w-[200px] text-[14px] text-text-2">
                    Project Id
                  </p>
                  <div className="px-3 py-3 flex-1 border border-panel-border rounded-[6px]">
                    <p className="text-[14px] text-text-1 truncate">
                      {activeProject?.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <h2 className="text-[24px] font-semibold text-text-1">Users</h2>
            <div className="border border-panel-border rounded-[6px]">
              <div className="w-full px-3 py-3 gap-3 flex items-center border-b border-panel-border">
                <p className="w-[200px] text-[14px] text-text-2">Email</p>
                <p className="flex-1 text-[14px] text-text-2">Role</p>
              </div>
              <div className="w-full flex flex-col">
                {projectUserList.map((user, index) => (
                  <div
                    key={user.id}
                    className={`w-full px-3 py-3 gap-3 flex items-center justify-between ${
                      index !== projectUserList.length - 1
                        ? 'border-b border-panel-border'
                        : ''
                    }`}
                  >
                    <p className="w-[200px] text-[14px] text-text-1 truncate">
                      {user.email}
                    </p>
                    <p className="flex-1 text-[14px] text-text-1">
                      {formatRole(user.role as any)}
                    </p>
                    {user.email !== userInfo?.email &&
                      user.role !== ProjectRole.OWNER && (
                        <Trash
                          className="w-4 h-4 text-text-2 cursor-pointer hover:text-text-1"
                          onClick={() => deleteProjectUser(user.id)}
                        />
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {projectUserList.find((user) => user.email === userInfo?.email)
            ?.role === ProjectRole.OWNER && (
            <Button
              variant="outline"
              className="!text-destructive self-start"
              onClick={deleteProject}
            >
              Delete Project
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const formatRole = (role: ProjectRole) => {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

export default Admin
