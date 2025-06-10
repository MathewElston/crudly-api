FROM node:alpine
WORKDIR /web
COPY package.json package-lock.json* ./
RUN npm i --legacy-peer-deps
COPY . .
CMD ["npm", "run","dev"]