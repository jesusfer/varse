import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OnboardingInput from '../../Library/OnboardingInput/OnboardingInput'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import useSignup from '../../../hooks/useSignup'

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async () => {
    if (password !== confirmPassword) return
    await signup(email, password)
    navigate('/dashboard')
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
          <OnboardingInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            type="email"
            onChange={(value) => setEmail(value)}
          />
          <OnboardingInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            type="password"
            onChange={(value) => setPassword(value)}
          />
          <OnboardingInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            type="password"
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <button
            className="w-full h-[40px] rounded-md bg-cta hover:bg-cta-hover text-cta-text text-[14px]"
            onClick={handleSignup}
          >
            Create Account
          </button>
          <p className="text-text-1 text-[14px]">
            Already have an account?{' '}
            <Link style={{ textDecoration: 'underline' }} to="/login">
              Log In
            </Link>
          </p>
        </div>
      </OnboardingCard>
    </div>
  )
}

export default Signup
