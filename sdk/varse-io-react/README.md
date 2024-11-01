# Varse React SDK

This is the official React SDK for Varse.

## Installation

```bash
npm install varse-io-react
```

## Usage

```tsx
// App.tsx
import { VarseProvider } from 'varse-io-react'

const App = () => {
  const varseOptions = {
    apiKey: 'your-api-key',
    baseUrl: 'https://api.varse.io',
  }

  return (
    <VarseProvider {...varseOptions}>
      <Component />
    </VarseProvider>
  )
}
```

```tsx
// Component.tsx
import { useVarseBool } from 'varse-io-react'

const Component = () => {
  const value = useVarseBool('my-variable')

  return <div>{value ? 'True' : 'False'}</div>
}
```
