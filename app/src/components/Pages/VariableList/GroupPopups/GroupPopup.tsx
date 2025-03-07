import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Group } from '../../../../backend/types'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import Button from '../../../Library/Button/Button'
import Input from '../../../Library/Input/Input'

interface GroupPopupProps {
  isOpen: boolean
  onClose: () => void
  create: (name: string) => void
  isUpdate: boolean
  currentName: string
  update: (name: string) => void
  groups: Group[]
}

const GroupPopup: React.FC<GroupPopupProps> = ({
  isOpen,
  onClose,
  create,
  isUpdate,
  currentName,
  update,
  groups,
}) => {
  const [name, setName] = useState('')
  const [groupName] = useDebounce(name.trim(), 100)
  const [canSubmit, setCanSubmit] = useState(true)
  const [nameClash, setNameClash] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {
    setName('')
    onClose()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      if (isUpdate) update(name)
      else create(name)
    }
    setName('')
    onClose()
  }

  useEffect(() => {
    const groupExists = groups.some((group) => group.name === groupName)
    setNameClash(groupExists)
    setCanSubmit(!groupExists)
  }, [groups, groupName])

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[6px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">
          {isUpdate ? 'Update' : 'Create'} group
        </h1>
        {nameClash ? (
          <p className="text-[red]">A group with that name already exists</p>
        ) : (
          ''
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <Input
              label="Name"
              value={name || currentName}
              type="text"
              placeholder={isUpdate ? currentName : 'Group name'}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" disabled={!canSubmit}>
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default GroupPopup
