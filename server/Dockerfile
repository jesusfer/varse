FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN apk add openssl && \
    npm install && \
    npx prisma generate && \
    npm run build

ENV NODE_ENV=production

EXPOSE 80

CMD ["node", "dist/index.js"]
