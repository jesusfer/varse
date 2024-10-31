import useNav from '../../../hooks/utils/useNav'

const NotFound: React.FC = () => {
  const navigate = useNav()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-[32px] font-semibold text-text-1">404</h1>
      <p className="text-[16px] text-text-2">Page not found</p>
      <button
        className="text-[14px] text-cta-base cursor-pointer underline"
        onClick={() => navigate('variable-list')}
      >
        Go back home
      </button>
    </div>
  )
}

export default NotFound
