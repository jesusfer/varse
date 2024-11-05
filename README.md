# Varse

Varse is a tool for updating application variables at runtime. It has a dashboard for managing variables and an SDK for reading variables. It has built-in team managment for sharing configs across a team.

## Use Cases

* Feature Flags: Toggle features on and off
* Rollouts: Incrementally rollout features to users
* Environments Specific Config: Set specific variables for each environment

## Architecture

Varse has a backend and a dashboard. Variables are created and updated in the dashboard. API Keys are created in the dashboard and used to authenticate requests to the backend. There is a client-side SDK for reading variables in React. There is also a server-side SDK for reading variables in Node.js.

## Getting Started
### Local Setup

1. Clone the repo
2. Follow README in `server` to setup Prisma and Postgres
3. Follow README in `app` to setup the dashboard
4. Visit `http://localhost:3000` to view the dashboard
5. Create a variable and API Key in the dashboard
6. Use the SDK to read the variable

### Varse Cloud (Recommended)
Get started with Varse Cloud quickly by following these simple steps:

1. Create an Account - Sign up at [varse.io/signup](https://varse.io/signup)
2. Make a Project
3. Create a variable and API Key in the dashboard
4. Use the SDK to read the variable

## Varse SDK
The Varse SDK is available client-side or server-side.

### Client-side
```tsx
// App.tsx
import { VarseProvider } from 'varse-io-react'

const App = () => {
  const varseOptions = {
    apiKey: 'pk_00000000000000000000000000000000',
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
  const value = useVarseBool('new_variable')

  return <div>{value ? 'True' : 'False'}</div>
}
```

### Server-side
```typescript
import { VarseClient } from "varse-io";

const client = new VarseClient({
  apiKey: "pk_00000000000000000000000000000000",
  baseUrl: "https://api.varse.io",
});

const value = await client.getBool("new_variable");
```