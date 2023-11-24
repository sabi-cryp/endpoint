# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy both package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your app runs
EXPOSE 80

# Command to run your application
CMD ["npm", "start"]


