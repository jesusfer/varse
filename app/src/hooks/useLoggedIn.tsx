import { useCallback } from 'react'
import useBackend from './useBackend'
import { useNavigate } from 'react-router-dom'

const LOGIN_PATH = '/login'
const SIGNUP_PATH = '/signup'

const useLoggedIn = () => {
  const backendService = useBackend()
  const navigate = useNavigate()

  const getPage = useCallback(() => window.location.pathname, [])

  const validate = useCallback(
    () =>
      backendService
        .validate()
        .then(() => {
          if ([LOGIN_PATH, SIGNUP_PATH].includes(getPage())) {
            navigate('/dashboard')
          }
        })
        .catch(() => navigate(LOGIN_PATH)),
    [backendService, getPage, navigate],
  )

  validate()
}

export default useLoggedIn
