import { ArrowUpRight } from 'lucide-react'
import { ProjectShareLink } from '../../../backend/types'
import Button from '../Button/Button'
import useActiveProject from '../../../hooks/state/useActiveProject'
import useProject from '../../../hooks/services/useProject'
import { useVarseBool } from 'varse-io-react'

export default function ShareButton() {
  const activeProject = useActiveProject()
  const { shareProject } = useProject()

  const visible = useVarseBool({ key: 'share_enabled' })
  if (!visible) return null

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
