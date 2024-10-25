import { PropsWithChildren } from 'react'

const OnboardingCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-[360px] flex flex-col items-center justify-center border p-6 gap-6 border-panel-border rounded-xl">
      {children}
    </div>
  )
}

export default OnboardingCard
