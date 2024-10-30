import { PropsWithChildren } from 'react'

const Table: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-between rounded-[6px] border border-panel-border">
      {children}
    </div>
  )
}

export default Table
