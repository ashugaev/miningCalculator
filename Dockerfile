FROM node:16.14.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

ARG TELEGRAM
ARG MONGO

RUN npm run build

CMD ["npm", "run", "start"]

