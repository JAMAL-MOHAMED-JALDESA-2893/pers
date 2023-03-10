### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies
# This is needed to build and compile our code
# while generating the docker image
FROM node:latest AS builder

RUN mkdir -p /app
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install -g npm@latest
RUN npm install --force
RUN npm run build --prod

# ### STAGE 2 NGINX Server
FROM nginx:latest
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=builder app/dist/clientside usr/share/nginx/html
