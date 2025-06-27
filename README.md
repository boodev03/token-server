# Token Management API Server

A robust REST API server for managing cryptocurrency tokens, built with Node.js, Express, TypeScript, and Prisma ORM.

## 🚀 Features

- **RESTful API** for token CRUD operations
- **TypeScript** for type safety and better development experience
- **Prisma ORM** with MySQL database
- **Input Validation** using class-validator and DTOs
- **File Upload** with Cloudflare R2 integration
- **CORS** enabled for cross-origin requests
- **Error Handling** with structured error responses
- **Environment Configuration** with dotenv
- **Code Quality** with ESLint and Prettier
- **Database Seeding** for development data

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- MySQL database
- Cloudflare R2 account (for file uploads)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/boodev03/token-server.git
   cd product-management-server
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure the following environment variables in `.env`:

   ```env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/token_management"

   # Server
   PORT=8080
   NODE_ENV=development

   # Cloudflare R2
   R2_ACCOUNT_ID=your_account_id
   R2_ACCESS_KEY_ID=your_access_key
   R2_SECRET_ACCESS_KEY=your_secret_key
   R2_BUCKET_NAME=your_bucket_name
   R2_PUBLIC_URL=https://your-bucket.your-account.r2.cloudflarestorage.com
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Seed the database (optional)
   pnpm run db:seed
   ```

## 🚦 Running the Application

### Development Mode

```bash
pnpm run dev
```

The server will start on `http://localhost:8080` with hot reloading.

### Production Mode

```bash
# Build the application
pnpm run build

# Start the production server
pnpm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api
```
