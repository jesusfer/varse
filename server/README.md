# Varse Server

## Install

```
bun install
```

## Run

```
bunx prisma generate
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
bun run start:local
```
