FROM node:alpine
WORKDIR /api
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]