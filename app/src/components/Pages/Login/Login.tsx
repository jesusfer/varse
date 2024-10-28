import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OnboardingInput from '../../Library/OnboardingInput/OnboardingInput'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import useLogin from '../../../hooks/useLogin'
import useLoggedIn from '../../../hooks/useLoggedIn'

const Login: React.FC = () => {
  useLoggedIn()

  const navigate = useNavigate()
  const { login } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await login(email, password)
    navigate('/dashboard')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <OnboardingCard>
        <div className="w-full flex flex-col items-start justify-center gap-1.5">
          <h2 className="text-[24px] font-semibold text-text-1">Login</h2>
          <p className="text-text-2 text-[14px]">
            Enter your email to login to your account
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
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4">
          <button
            className="w-full h-[40px] rounded-md bg-cta-base hover:bg-cta-hover text-cta-text text-[14px]"
            onClick={handleLogin}
          >
            Log In
          </button>
          <p className="text-text-1 text-[14px]">
            Don't have an account?{' '}
            <Link style={{ textDecoration: 'underline' }} to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </OnboardingCard>
    </div>
  )
}

export default Login
