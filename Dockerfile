# Container to build front-end assets
FROM node:10 as asset-builder
WORKDIR /build
COPY client-side/. ./
RUN npm install
# build production assets
RUN npm run build

# container for web server
FROM node:10
COPY node/. ./
RUN npm install
COPY --from=asset-builder /build/dist /home/node/app/dist/
