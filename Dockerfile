#Dockerfile for local development in docker container
FROM node:20.10.0-alpine

#install pmpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json
COPY ./package.json ./

# Copy the rest of the files
COPY . .

# Install dependencies
RUN pnpm install

# Deploy app whit dev scrypt in package.json
CMD pnpm run dev