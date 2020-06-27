# Container to build front-end assets
FROM node:10 as asset-builder
WORKDIR /app
COPY . ./
RUN npm install
# build production assets
RUN npm run build

# container for web server
FROM node:10
COPY package.json .
RUN npm install
COPY — from=asset-builder /app/dist /home/node/app/dist/
