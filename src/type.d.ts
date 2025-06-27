export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    meta?: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
    };
}

export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}