FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]