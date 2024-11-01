import { createContext, PropsWithChildren } from 'react'
import { VarseClient, VarseClientOptions } from 'varse-io'

interface VarseProviderProps extends PropsWithChildren<VarseClientOptions> {}

const VarseContext = createContext<VarseClient | null>(null)

const VarseProvider: React.FC<VarseProviderProps> = ({
  children,
  ...options
}) => {
  const client = new VarseClient(options)
  return (
    <VarseContext.Provider value={client}>{children}</VarseContext.Provider>
  )
}

export { VarseProvider, VarseContext }
