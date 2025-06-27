import cors from "cors";
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import 'reflect-metadata'; // Must be first import
import tokenRoutes from "./routes/token.route";
import uploadRoutes from "./routes/upload.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// Basic logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Token Management API with Prisma",
        version: "1.0.0",
        environment: process.env.NODE_ENV,
        endpoints: {
            health: "/health",
            tokens: "/api/tokens"
        }
    });
});

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});

// API routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something broke!'
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🗄️  Database: Prisma with MySQL`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET    /api/tokens - Get all tokens`);
    console.log(`   GET    /api/tokens/:id - Get token by ID`);
    console.log(`   GET    /api/tokens/symbol/:symbol - Get token by symbol`);
    console.log(`   POST   /api/tokens - Create token`);
    console.log(`   PUT    /api/tokens/:id - Update token`);
    console.log(`   DELETE /api/tokens/:id - Delete token`);
    console.log(`   GET    /api/tokens/stats - Get token statistics`);
});

export default app;