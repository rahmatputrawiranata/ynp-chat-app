# Use the official Node.js 14 image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json yarn.lock ./


# Install all dependencies, including devDependencies
RUN yarn install

# Copy the source code to the working directory
COPY . .

# Build the Nest.js application
RUN yarn build

# Install the dependencies
RUN yarn install --production

# Expose the port on which the Nest.js application will run
EXPOSE 3000

# Start the Nest.js application
CMD ["yarn", "start:prod"]
