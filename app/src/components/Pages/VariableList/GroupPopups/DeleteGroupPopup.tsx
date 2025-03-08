import { useRef } from 'react'
import useClickOutside from '../../../../hooks/utils/useClickOutside'
import Button from '../../../Library/Button/Button'

interface GroupPopupProps {
  isOpen: boolean
  onClose: () => void
  deleteGroup: () => void
}

const DeleteGroupPopup: React.FC<GroupPopupProps> = ({
  isOpen,
  onClose,
  deleteGroup,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    deleteGroup()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-backgroundPopup z-[1]">
      <div
        ref={ref}
        className="w-[360px] p-6 flex flex-col items-start justify-start gap-6 rounded-[6px] bg-panel-background border border-panel-border"
      >
        <h1 className="text-[24px] font-semibold text-text-1">Delete group</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6"
        >
          <p className="text-text-1">
            If you delete this group, its variables will be moved to the default
            group.
          </p>
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    </div>
  )
}

export default DeleteGroupPopup
