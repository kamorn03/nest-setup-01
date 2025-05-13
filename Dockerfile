# Use the official Node.js image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install PostgreSQL client dependencies (if required)
RUN apk add --no-cache postgresql-client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the application
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Set environment variables for PostgreSQL (These will be set at runtime in the docker-compose.yml)
ENV DB_HOST=db
ENV DB_PORT=54321
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_DATABASE=nestjs

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
