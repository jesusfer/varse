import Button from '../../Library/Button/Button'
import TopBar from '../../Library/TopBar/TopBar'
import useProjectDelete from '../../../hooks/actions/useProjectDelete'

const Admin: React.FC = () => {
  const deleteProject = useProjectDelete()

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <h2 className="text-[14px] text-text-1">Admin</h2>
      </TopBar>

      <div className="w-full h-full flex flex-col p-8 gap-4 items-center overflow-hidden">
        <div className="w-full max-w-[600px] flex flex-col gap-4">
          <h2 className="text-[24px] font-semibold text-text-1">Project</h2>
          <div className="border border-panel-border rounded-[6px]">
            <div className="w-full px-3 py-3 gap-2 flex items-center border-b border-panel-border">
              <p className="text-[14px] text-text-1">Project Info</p>
            </div>
            <div className="w-full px-3 py-3 gap-3 flex flex-col">
              <div className="w-full gap-3 flex items-center justify-between">
                <p className="w-[140px] text-[14px] text-text-2">
                  Project Name
                </p>
                <div className="px-3 py-3 flex-1 border border-panel-border rounded-[6px]">
                  <p className="text-[14px] text-text-1 truncate">Info</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="!text-destructive self-start"
            onClick={deleteProject}
          >
            Delete Project
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Admin
