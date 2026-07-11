FROM node:20-alpine
WORKDIR /app

# Copy package files first to optimize layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Vite default port
EXPOSE 5173

# Run Vite dev server, forcing it to listen on all network interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
