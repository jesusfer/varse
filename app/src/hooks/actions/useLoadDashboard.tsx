import { useEffect } from 'react'
import useReloadDashboard from './useReloadDashboard'

export default function useLoadDashboard() {
  const reloadDashboard = useReloadDashboard()

  useEffect(() => {
    reloadDashboard()
  }, [reloadDashboard])
}
