import { useLocation } from 'react-router-dom'
import type { LinkKey } from './useNav'

export default function useCurrentPage(): LinkKey | null {
  const { pathname } = useLocation()

  if (pathname === '/variable-list') return 'variable-list'
  if (pathname.startsWith('/variable-details')) return 'variable-details'
  if (pathname === '/keys') return 'keys'
  if (pathname === '/admin') return 'admin'
  if (pathname === '/account') return 'account'
  if (pathname === '/first-project') return 'first-project'
  if (pathname === '/login') return 'login'
  if (pathname === '/signup') return 'signup'

  return null
}
