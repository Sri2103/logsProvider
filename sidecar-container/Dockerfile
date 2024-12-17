# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application files
COPY sidecar.js ./
COPY sidecar-config ./sidecar-config

# Expose shared volume path
VOLUME ["/app/logs"]

# Run the Sidecar
CMD ["npm", "start"]
