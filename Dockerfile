FROM node:14-alpine

RUN npm install -g server

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3000

CMD serve -s build -l 3000