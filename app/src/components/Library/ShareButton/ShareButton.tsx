import { ArrowUpRight } from 'lucide-react'
import { ProjectShareLink } from '../../../backend/types'
import { useActiveProject } from '../../../context/ProjectContext'
import useProject from '../../../hooks/useProject'
import Button from '../Button/Button'
import { useState } from 'react'

export default function ShareButton() {
  const { activeProject } = useActiveProject()
  const { shareProject } = useProject()
  const [isVisible] = useState(false)

  if (!isVisible) return null

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (!activeProject) return
        shareProject(activeProject.id).then((link) => {
          navigator.clipboard.writeText(createLink(link))
        })
      }}
    >
      Share
      <ArrowUpRight size={12} />
    </Button>
  )
}

const { REACT_APP_APP_ADDRESS } = process.env
const APP_ADDRESS = REACT_APP_APP_ADDRESS
  ? REACT_APP_APP_ADDRESS
  : 'http://localhost:3000'

function createLink(link: ProjectShareLink) {
  return `${APP_ADDRESS}/signup/?referral=true&id=${link.id}&project=${link.projectId}`
}
