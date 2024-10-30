import { useState } from 'react'
import Input from '../../Library/Input/Input'
import OnboardingCard from '../../Library/OnboardingCard/OnboardingCard'
import useLogin from '../../../hooks/useLogin'
import Button from '../../Library/Button/Button'
import useNav from '../../../hooks/useNav'
import useLoginRedirect from '../../../hooks/useLoginRedirect'

const Login: React.FC = () => {
  useLoginRedirect()
  const navigate = useNav()
  const { login } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    navigate('variables')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <OnboardingCard>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col items-start justify-center gap-1.5">
            <h2 className="text-[24px] font-semibold text-text-1">Login</h2>
            <p className="text-text-2 text-[14px]">
              Enter your email to login to your account
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
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4">
            <Button type="submit" className="w-full">
              Log In
            </Button>
            <p className="text-text-2 text-[14px]">
              Don't have an account?{' '}
              <span
                className="underline text-text-1 cursor-pointer"
                onClick={() => {
                  console.log('clicked')
                  navigate('signup')
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </OnboardingCard>
    </div>
  )
}

export default Login
