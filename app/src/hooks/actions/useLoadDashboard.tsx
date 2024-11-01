import { useEffect } from 'react'
import useLoadKeys from '../data/useLoadKeys'
import useLoadProjectList from '../data/useLoadProjectList'
import useLoadUser from '../data/useLoadUser'
import useLoadVariables from '../data/useLoadVariables'
import useLoadProjectUserList from '../data/useProjectUserList'

const useLoadDashboard = () => {
  const loadUser = useLoadUser()
  const loadProjectList = useLoadProjectList()
  const loadAPIKeys = useLoadKeys()
  const loadProjectUserList = useLoadProjectUserList()
  const loadVariables = useLoadVariables()

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    loadProjectList()
  }, [loadProjectList])

  useEffect(() => {
    loadAPIKeys()
  }, [loadAPIKeys])

  useEffect(() => {
    loadProjectUserList()
  }, [loadProjectUserList])

  useEffect(() => {
    loadVariables()
  }, [loadVariables])
}

export default useLoadDashboard
