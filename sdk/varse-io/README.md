# Varse SDK

This is the official JavaScript SDK for Varse.

## Installation

```bash
npm install varse-io
```

## Usage

```typescript
import { VarseClient } from "varse-io";

const client = new VarseClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.varse.io",
});

const value = await client.getBool("my-variable");
```
