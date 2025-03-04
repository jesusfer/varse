FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN apk add openssl && \
    npm ci && \
    npx prisma generate && \
    npm run build

ENV NODE_ENV=production

EXPOSE ${SERVER_PORT}

CMD ["node", "dist/index.js"]
