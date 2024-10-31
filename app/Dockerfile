FROM node:18.17

RUN apt-get update && apt-get install -y curl

WORKDIR /usr/src/app

ARG ENV_FILE=.env.production

COPY package*.json ./

RUN npm install

COPY . .

COPY ${ENV_FILE} .env.production

RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]