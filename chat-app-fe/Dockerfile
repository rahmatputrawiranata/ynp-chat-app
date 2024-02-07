# Use an official Node.js image as the base
FROM node:20-alpine as web-app-build

# Set the working directory inside the container
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json and yarn lock to the working directory
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the current directory contents into the container at /app
COPY . .

RUN yarn build

# Run the app using nginx
FROM nginx:1.25-alpine-perl

# Copy the build files to the nginx server
COPY --from=web-app-build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80