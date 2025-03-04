FROM node:22-alpine

WORKDIR /usr/src/app

COPY . .

# RUN apt-get update && \
#     apt-get install -y curl
RUN npm install && \
    npm run build

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]
