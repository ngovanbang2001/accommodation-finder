FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 3000
RUN npm install --production
CMD [ "npm", "start"]
