# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose the default port
EXPOSE 10000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
