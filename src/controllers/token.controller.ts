import { Request, Response } from 'express';
import tokenService from '../services/token.service';
import { CreateTokenDto, UpdateTokenDto, TokenQueryDto } from '../dtos/token.dto';

interface ApiResponse<T> {
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

class TokenController {
    // Create a new token
    async createToken(req: Request, res: Response): Promise<void> {
        try {
            const dto: CreateTokenDto = req.body;

            const token = await tokenService.createToken(dto);

            const response: ApiResponse<typeof token> = {
                success: true,
                message: 'Token created successfully',
                data: token
            };

            res.status(201).json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to create token',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(400).json(response);
        }
    }

    // Get all tokens with filtering and pagination
    async getTokens(req: Request, res: Response): Promise<void> {
        try {
            const params: TokenQueryDto = req.query as any;

            const { tokens, total } = await tokenService.getTokens(params);
            const totalPages = Math.ceil(total / (params.limit || 10));

            const response: ApiResponse<typeof tokens> = {
                success: true,
                message: 'Tokens retrieved successfully',
                data: tokens,
                meta: {
                    total,
                    page: Number(params.page) || 1,
                    limit: Number(params.limit) || 10,
                    total_pages: totalPages
                }
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve tokens',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

    // Get token by ID
    async getTokenById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const token = await tokenService.getTokenById(id);

            if (!token) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Token not found',
                    error: 'Token with specified ID does not exist'
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<typeof token> = {
                success: true,
                message: 'Token retrieved successfully',
                data: token
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve token',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

    // Get token by symbol
    async getTokenBySymbol(req: Request, res: Response): Promise<void> {
        try {
            const { symbol } = req.params;
            const token = await tokenService.getTokenBySymbol(symbol);

            if (!token) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Token not found',
                    error: 'Token with specified symbol does not exist'
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<typeof token> = {
                success: true,
                message: 'Token retrieved successfully',
                data: token
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve token',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

    // Update token
    async updateToken(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dto: UpdateTokenDto = req.body;

            const token = await tokenService.updateToken(id, dto);

            if (!token) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Token not found',
                    error: 'Token with specified ID does not exist'
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<typeof token> = {
                success: true,
                message: 'Token updated successfully',
                data: token
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to update token',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(400).json(response);
        }
    }

    // Delete token
    async deleteToken(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await tokenService.deleteToken(id);

            if (!deleted) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Token not found',
                    error: 'Token with specified ID does not exist'
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<null> = {
                success: true,
                message: 'Token deleted successfully'
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to delete token',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }

    // Get token statistics
    async getTokenStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await tokenService.getTokenStats();

            const response: ApiResponse<typeof stats> = {
                success: true,
                message: 'Token statistics retrieved successfully',
                data: stats
            };

            res.json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve token statistics',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
}

export default new TokenController();