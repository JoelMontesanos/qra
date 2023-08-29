# Use the official Node.js image as the base image
FROM node:14

# Install PM2 globally
RUN npm install pm2 -g

# Set the working directory within the container
WORKDIR /qra

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire contents of the local 'src' directory to the container
COPY src/ ./src/

# Set the working directory to /qra/src
WORKDIR /qra/src

# Start the Node.js application using PM2
CMD ["pm2-runtime", "index.js"]