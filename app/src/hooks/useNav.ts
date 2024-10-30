import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_WEBSITE_URL || 'http://varse.io'

type LinkKey =
  | 'docs.home'
  | 'docs.variables.create'
  | 'docs.variables.read'
  | 'variables'
  | 'keys'
  | 'login'
  | 'signup'

const linkMap: Record<LinkKey, string> = {
  'docs.home': `${baseUrl}/docs`,
  'docs.variables.create': `${baseUrl}/docs/creating-variables`,
  'docs.variables.read': `${baseUrl}/docs/updating-variables`,
  variables: '/variables',
  keys: '/keys',
  login: '/login',
  signup: '/signup',
}

const isInternalLink = (key: LinkKey) => linkMap[key].startsWith('/')

const useNav = () => {
  const navigate = useNavigate()

  return useCallback(
    (key: LinkKey, id?: string) => {
      let path = linkMap[key]

      if (key === 'variables' && id) {
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
