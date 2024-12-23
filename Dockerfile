FROM node:20.11.1

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8457 for the application
EXPOSE 8457

# Start the application
CMD [ "node", "src/app.js" ]