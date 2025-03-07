import { Copy, Edit2, Trash2 } from 'lucide-react'
import useNav from '../../../../hooks/utils/useNav'
import { Variable, Group } from '../../../../backend/types'
import { useMemo } from 'react'

interface VariableTableProps {
  groups: Group[]
  variableList: Variable[]
  search: string
  onSelect: (key: string) => void
  openUpdateGroupPopup: (groupId: string, currentName: string) => void
  openDeleteGroupPopup: (groupId: string) => void
}

const VariableTable: React.FC<VariableTableProps> = ({
  groups,
  variableList: variables,
  search,
  onSelect,
  openUpdateGroupPopup,
  openDeleteGroupPopup,
}) => {
  const navigate = useNav()

  const filteredVariables = useMemo(() => {
    let foundVariables = variables.filter((variable) =>
      variable.key.toLowerCase().includes(search.toLowerCase()),
    )
    const groupedVariables = Map.groupBy(
      foundVariables,
      (item: Variable) => item.groupId,
    )
    groupedVariables.forEach((vars, key, map) => {
      const sorted = vars.sort((a, b) =>
        a.key < b.key ? -1 : a.key === b.key ? 0 : 1,
      )
      map.set(key, sorted)
    })

    let groupsWithVariables = new Map<string, Variable[]>()
    groups.forEach((group) => groupsWithVariables.set(group.id, []))
    groupedVariables
      .keys()
      .forEach((groupId) =>
        groupsWithVariables.set(groupId, groupedVariables.get(groupId) || []),
      )
    return groupsWithVariables
  }, [groups, variables, search])

  return (
    <div className="w-full max-w-[600px] h-full border border-panel-border rounded-[6px] flex-shrink overflow-auto">
      {variables.length > 0 && (
        <div className="w-full flex flex-col overflow-y-auto">
          {filteredVariables
            .keys()
            .toArray()
            .map((groupId) => (
              <div key={groupId}>
                <div className="top-0 w-full p-0 items-center justify-between border-b border-panel-border">
                  <div className="p-3 flex bg-panel-background border-b border-panel-border">
                    <div className="flex-none text-[14px] text-text-2">
                      <b>{groups.find((g) => g.id === groupId)?.name}</b>
                    </div>
                    {!groups.find((g) => g.id === groupId)?.isDefault ? (
                      <>
                        <div
                          className="w-4 h-4 ml-4 flex-none text-text-2 hover:text-text-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            const currentName =
                              groups.find((g) => g.id === groupId)?.name || ''
                            openUpdateGroupPopup(groupId, currentName)
                          }}
                          title="Edit the name"
                        >
                          <Edit2 size={14} />
                        </div>
                        <div
                          className="w-4 h-4 ml-2 flex-1 text-text-2 hover:text-text-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            openDeleteGroupPopup(groupId)
                          }}
                          title="Delete this group"
                        >
                          <Trash2 size={14} color="firebrick" />
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                    <p className="flex-1 pr-2 text-right text-[14px] text-text-2">
                      {groupId}
                    </p>
                    <div
                      className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(groupId)
                      }}
                      title="Copy the ID"
                    >
                      <Copy size={16} />
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-end gap-3">
                    <p className="w-[140px] text-[14px] text-text-2">Key</p>
                    <p className="flex-1 text-[14px] text-text-2">Value</p>
                    <div className="w-4 h-4" />
                  </div>
                </div>
                {filteredVariables.get(groupId)?.map((variable) => (
                  <div
                    key={variable.id}
                    className="w-full p-3 flex items-center justify-between border-b border-panel-border hover:bg-input-active cursor-pointer"
                    onClick={() => onSelect(variable.id)}
                  >
                    <div className="flex-1 flex items-center justify-end gap-3">
                      <p className="w-[140px] text-[14px] text-text-1">
                        {variable.key}
                      </p>
                      <p className="flex-1 text-[14px] text-text-1">
                        {variable.value}
                      </p>
                      <div
                        className="w-4 h-4 text-text-2 hover:text-text-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(variable.key)
                        }}
                        title="Copy the variable key"
                      >
                        <Copy size={16} />
                      </div>
                    </div>
                  </div>
                ))}
                {filteredVariables.get(groupId)?.length === 0 && (
                  <div className="w-full flex items-center justify-start p-3">
                    <p className="w-full text-center text-[14px] text-text-2">
                      No variables found.
                    </p>
                  </div>
                )}{' '}
              </div>
            ))}
        </div>
      )}
      {variables.length === 0 && (
        <div className="w-full flex items-center justify-between p-3">
          <p className="text-[14px] text-text-2">
            You don't have any variables yet.
          </p>
          <button
            className="text-[14px] text-cta-base cursor-pointer underline"
            onClick={() => navigate('docs')}
          >
            Quick Start
          </button>
        </div>
      )}
    </div>
  )
}

export default VariableTable
