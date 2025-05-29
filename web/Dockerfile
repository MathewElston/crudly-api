FROM node:latest
WORKDIR /web
COPY package.json package-lock.json* ./
RUN npm i
COPY . .
CMD ["npm", "run","dev"]