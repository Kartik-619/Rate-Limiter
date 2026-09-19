# --- Builder Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copy ONLY package files first to ensure a clean dependency install
COPY package*.json ./

# 2. Install all dependencies (including devDependencies like typescript)
RUN npm ci --include=dev

# 3. Now copy the rest of the source code
COPY . .

# 4. Build the TypeScript project
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled output from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3008

CMD ["npm", "start"]