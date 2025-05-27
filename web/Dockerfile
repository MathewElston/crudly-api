FROM node:alpine
WORKDIR /web
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "run","dev"]