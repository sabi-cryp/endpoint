# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server.js and index.html to the working directory
COPY server.js .
COPY index.html .

# Expose port 80
EXPOSE 80

# Run the application
CMD ["node", "server.js"]
