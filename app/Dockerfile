ARG API_ADDRESS
ARG UI_ADDRESS

FROM node:22-alpine AS build

ARG API_ADDRESS
ENV REACT_APP_SERVER_ADDRESS=$API_ADDRESS
ENV REACT_APP_APP_ADDRESS=$UI_ADDRESS

WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
    npm run build

FROM nginx:alpine AS final

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html/
