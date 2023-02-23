FROM node:16.13.1

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 8081

CMD ["npm", "start"]