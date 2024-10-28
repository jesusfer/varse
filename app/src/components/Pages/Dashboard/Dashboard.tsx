import useLoggedIn from '../../../hooks/useLoggedIn'

const Dashboard: React.FC = () => {
  useLoggedIn()

  return <div>Dashboard</div>
}

export default Dashboard
