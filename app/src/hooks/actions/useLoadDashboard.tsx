import { useEffect } from 'react'
import useLoadKeys from '../data/useLoadKeys'
import useLoadProjectList from '../data/useLoadProjectList'
import useLoadUser from '../data/useLoadUser'
import useLoadVariables from '../data/useLoadVariables'
import useLoadProjectUserList from '../data/useProjectUserList'
import useLoadGroups from '../data/useLoadGroups'

const useLoadDashboard = () => {
  const loadUser = useLoadUser()
  const loadProjectList = useLoadProjectList()
  const loadKeys = useLoadKeys()
  const loadProjectUserList = useLoadProjectUserList()
  const loadGroups = useLoadGroups()
  const loadVariables = useLoadVariables()

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    loadProjectList()
  }, [loadProjectList])

  useEffect(() => {
    loadKeys()
  }, [loadKeys])

  useEffect(() => {
    loadProjectUserList()
  }, [loadProjectUserList])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useEffect(() => {
    loadVariables()
  }, [loadVariables])
}

export default useLoadDashboard
