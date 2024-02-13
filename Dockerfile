#Dockerfile for local development in docker container
FROM node:20.10.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Deploy app whit dev scrypt in package.json
CMD npm run dev