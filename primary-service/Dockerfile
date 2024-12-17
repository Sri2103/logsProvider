# Dockerfile for the backend using nodejs# Use official Node.js image from Docker Hub
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for web app and Prometheus metrics
EXPOSE 3000
EXPOSE 9090

# Command to start the application
CMD ["npm", "start"]
