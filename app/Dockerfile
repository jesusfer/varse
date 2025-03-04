FROM node:22-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
    npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npx", "serve", "-s", "build" ]
