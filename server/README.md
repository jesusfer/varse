# Varse Server

## Install

```
bun install
```

## Run

```
bunx prisma generate
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
docker exec postgres psql -U postgres -c "CREATE DATABASE mydb;"

bunx prisma migrate deploy
bun run start:local
```
