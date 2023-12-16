# Development Stage
FROM node:20-alpine3.17 AS development

# Set the working directory
WORKDIR /backend

# Install build tools and dependencies
RUN apk add --no-cache make gcc g++ python3

# Copy only the necessary files for npm install
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ .

# Run any other commands for additional debugging if needed
RUN npm run build

# Set environment variables
ENV PORT=4000
ENV NODE_ENV=development
ENV CLIENT=http://localhost:4000

# Expose port for development
EXPOSE ${PORT}

# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Specify the command to run when the container starts
CMD ["node", "dist/index.js"]
