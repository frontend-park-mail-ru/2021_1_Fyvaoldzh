FROM node:14-alpine3.10

COPY .github /frontend

WORKDIR /frontend

RUN npm run build

CMD ["npm", "start"]

