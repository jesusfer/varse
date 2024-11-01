import { useState } from 'react'
import Input from '../../Library/Input/Input'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import Button from '../../Library/Button/Button'
import useLoginRedirect from '../../../hooks/utils/useLoginRedirect'
import useNav from '../../../hooks/utils/useNav'
import useReferalCode from '../../../hooks/utils/useReferalCode'
import useSignup from '../../../hooks/actions/useSignup'

const Signup: React.FC = () => {
  useLoginRedirect()
  const navigate = useNav()
  const referral = useReferalCode()
  const handleSignup = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    await handleSignup(email, password, referral || undefined)
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <OnboardingCard>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col items-start justify-center gap-1.5">
            <h2 className="text-[24px] font-semibold text-text-1">Sign Up</h2>
            <p className="text-text-2 text-[14px]">
              Enter your email to create your account
            </p>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-text-2 text-[14px]">
              Already have an account?{' '}
              <span
                className="underline text-text-1 cursor-pointer"
                onClick={() => navigate('login')}
              >
                Log In
              </span>
            </p>
          </div>
        </form>
      </OnboardingCard>
    </div>
  )
}

export default Signup
