FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run install:frontend

RUN npm run build:frontend

CMD ["npm", "start"]