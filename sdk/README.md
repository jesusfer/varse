# Varse SDK

The Varse SDK is available client-side or server-side.

### Client-side
#### Install
```
bun install varse-io-react
```

#### Usage
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

#### Install
```
bun install varse-io
```

#### Usage
```typescript
import { VarseClient } from "varse-io";

const client = new VarseClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.varse.io",
});

const value = await client.getBool("my-variable");
```