# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the server.js and index.html to the working directory
COPY server.js .


# Install express module
RUN npm install express

# Expose port 30001
EXPOSE 80

# Run the application
CMD ["node", "server.js"]

