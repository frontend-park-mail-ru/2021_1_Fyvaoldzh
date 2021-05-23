FROM node:14-alpine3.10

COPY . /frontend

WORKDIR /frontend

RUN npm install
RUN npm run build

CMD ["npm", "start"]

