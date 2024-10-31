import { ArrowUpRight } from 'lucide-react'
import { ProjectShareLink } from '../../../backend/types'
import Button from '../Button/Button'
import { useState, useEffect } from 'react'
import useActiveProject from '../../../hooks/state/useActiveProject'
import useProject from '../../../hooks/services/useProject'
import { VarseClient } from 'varse-io'

const client = new VarseClient({
  apiKey: 'pk_84e2aa4f6fe34cfb85c403996654218d',
  baseUrl: 'https://api.varse.io',
})

export default function ShareButton() {
  const activeProject = useActiveProject()
  const { shareProject } = useProject()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    client.getBool('share_enabled').then((value) => {
      setIsVisible(value)
    })
  }, [])

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
