import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_WEBSITE_URL || 'http://varse.io'

type LinkKey =
  | 'docs.home'
  | 'docs.variables.create'
  | 'docs.variables.read'
  | 'variable-list'
  | 'variable-details'
  | 'keys'
  | 'account'
  | 'login'
  | 'signup'
  | 'first-project'

const linkMap: Record<LinkKey, string> = {
  'docs.home': `${baseUrl}/docs`,
  'docs.variables.create': `${baseUrl}/docs/creating-variables`,
  'docs.variables.read': `${baseUrl}/docs/updating-variables`,
  'variable-list': '/variable-list',
  'variable-details': '/variable-details',
  keys: '/keys',
  account: '/account',
  login: '/login',
  signup: '/signup',
  'first-project': '/first-project',
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
