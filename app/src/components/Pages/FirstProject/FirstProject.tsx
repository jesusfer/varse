import { useState } from 'react'
import Input from '../../Library/Input/Input'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import Button from '../../Library/Button/Button'
import useNav from '../../../hooks/utils/useNav'
import useAuthRequired from '../../../hooks/utils/useAuthRequired'
import useProject from '../../../hooks/services/useProject'

const FirstProject: React.FC = () => {
  useAuthRequired()
  const { createProject } = useProject()
  const navigate = useNav()
  const [projectName, setProjectName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createProject(projectName)
    navigate('variable-list')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <OnboardingCard>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col items-start justify-center gap-1.5">
            <h2 className="text-[24px] font-semibold text-text-1">
              Create a Project
            </h2>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <Input
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create Project
            </Button>
          </div>
        </form>
      </OnboardingCard>
    </div>
  )
}

export default FirstProject
