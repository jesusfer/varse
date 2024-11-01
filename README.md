# Varse.io

Varse is a simple tool for managing server variables at runtime. It's optimal for updating configurations without redeploying.

* Feature Flags: Toggle features on and off
* Rollouts: Selectively rollout features to users
* Environments Specific Config: Set specific variables for each environment

## Getting Started
### Varse Cloud (Recommended)
Get started with Varse Cloud quickly by following these simple steps:

1. Create an Account - Sign up at [varse.io/signup](https://varse.io/signup)
2. Make a Project
3. Create a Variable
4. Create an API Key
5. Install the Varse SDK to read the variable

## Varse SDK
The Varse SDK is available client-side or server-side.

### Client-side
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

### Server-side
```typescript
import { VarseClient } from "varse-io";

const client = new VarseClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.varse.io",
});

const value = await client.getBool("my-variable");
```