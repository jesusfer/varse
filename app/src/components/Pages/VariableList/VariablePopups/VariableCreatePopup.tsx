import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Group, Variable } from '../../../../backend/types'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import Button from '../../../Library/Button/Button'
import Input from '../../../Library/Input/Input'
import Select from '../../../Library/Select/Select'

interface VariableCreatePopupProps {
  isOpen: boolean
  create: (groupId: string, name: string, value: string) => void
  onClose: () => void
  groups: Group[]
  variables: Variable[]
}

const VariableCreatePopup: React.FC<VariableCreatePopupProps> = ({
  isOpen,
  create,
  onClose,
  groups,
  variables,
}) => {
  const defaultGroup = groups.find((g) => g.isDefault)
  const defaultGroupId = defaultGroup ? defaultGroup.id : ''
  const [name, setName] = useState('')
  const [variableName] = useDebounce(name.trim(), 100)
  const [value, setValue] = useState('')
  const [group, setGroup] = useState(defaultGroupId)
  const [canSubmit, setCanSubmit] = useState(true)
  const [nameClash, setNameClash] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {
    setName('')
    setValue('')
    onClose()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      create(group || defaultGroupId, name, value.trim() || 'true')
    }
    setName('')
    setValue('')
    // setGroup(defaultGroupId)
    setCanSubmit(true)
    setNameClash(false)
    onClose()
  }

  useEffect(() => {
    const variableExists = variables.some(
      (variable) => variable.key === variableName,
    )
    setNameClash(variableExists)
    setCanSubmit(!variableExists)
  }, [variables, variableName])

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[6px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">
          Create Variable
        </h1>
        {nameClash ? (
          <p className="text-[red]">A variable with that name already exists</p>
        ) : (
          ''
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <Input
              label="Key"
              value={name}
              type="text"
              placeholder="variable_key"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <Input
              label="Value"
              value={value}
              type="text"
              placeholder="true"
              onChange={(e) => setValue(e.target.value)}
            />
            <Select
              label="Group"
              options={groups.map((g) => {
                return {
                  key: g.id,
                  value: g.name,
                }
              })}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!canSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default VariableCreatePopup
