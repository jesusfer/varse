import { useState } from 'react'
import Input from '../../Library/Input/Input'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import useSignup from '../../../hooks/useSignup'
import Button from '../../Library/Button/Button'
import useNav from '../../../hooks/useNav'
import useLoginRedirect from '../../../hooks/useLoginRedirect'

const Signup: React.FC = () => {
  useLoginRedirect()
  const navigate = useNav()
  const { signup } = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async () => {
    if (password !== confirmPassword) return
    await signup(email, password)
    navigate('first-project')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <OnboardingCard>
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
            onChange={(value) => setEmail(value)}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            type="password"
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <Button className="w-full" onClick={handleSignup}>
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
      </OnboardingCard>
    </div>
  )
}

export default Signup
