import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const githubUrl = 'https://github.com/varse-io/varse'

export type LinkKey =
  | 'docs'
  | 'variables'
  | 'variable-details'
  | 'keys'
  | 'admin'
  | 'account'
  | 'login'
  | 'signup'
  | 'first-project'
  | 'onboarding'

const linkMap: Record<LinkKey, string> = {
  docs: `${githubUrl}`,
  variables: '/variables',
  'variable-details': '/variable',
  keys: '/keys',
  account: '/account',
  admin: '/admin',
  login: '/login',
  signup: '/signup',
  'first-project': '/first-project',
  onboarding: '/onboarding',
}

const isInternalLink = (key: LinkKey) => linkMap[key].startsWith('/')

const useNav = () => {
  const navigate = useNavigate()

  return useCallback(
    (key: LinkKey, id?: string) => {
      let path = linkMap[key]

      if (key === 'variable-details' && id) {
        path = `${path}/${id}`
      }

      if (isInternalLink(key)) {
        navigate(path)
      } else {
        window.open(path, '_blank')
      }
    },
    [navigate],
  )
}

export default useNav
