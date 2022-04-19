FROM node:current-slim as build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

ENTRYPOINT ["npm", "run", "prod"]