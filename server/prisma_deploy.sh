#!/bin/sh
SERVER_DATABASE_URL=$(cat /run/secrets/db_url) npx prisma migrate deploy
