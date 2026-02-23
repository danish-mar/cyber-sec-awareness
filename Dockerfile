# Base Image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source
COPY . .

# Explicitly copy .env as requested by user
COPY .env .env

# Expose port (from .env or default 3000)
EXPOSE 3000

# Start command
CMD ["node", "app.js"]
