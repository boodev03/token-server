import { Token, PrismaToken } from '~/types/token';
import { PrismaClient } from '../../generated/prisma';
import { CreateTokenDto, TokenQueryDto, UpdateTokenDto } from '../dtos/token.dto';

// Response DTO for API
interface TokenResponseDto {
    id: string;
    logo: string;
    name: string;
    symbol: string;
    totalSupply: number;
    priceUsd: number;
    description: string;
    website: string | null;
    createdAt: Date;
    updatedAt: Date;
}

class TokenService {
    private prisma = new PrismaClient();

    // Create a new token
    async createToken(dto: CreateTokenDto): Promise<Token> {
        // Check if symbol already exists
        const existingToken = await this.prisma.token.findFirst({
            where: { symbol: dto.symbol }
        });

        if (existingToken) {
            throw new Error(`Token with symbol ${dto.symbol} already exists`);
        }

        const newToken = await this.prisma.token.create({
            data: {
                logo: dto.logo,
                name: dto.name,
                symbol: dto.symbol,
                totalSupply: dto.totalSupply ? BigInt(dto.totalSupply) : BigInt(0),
                priceUsd: dto.priceUsd || 0,
                description: dto.description,
                website: dto.website,
            }
        });

        return this.toResponseDto(newToken);
    }

    // Get all tokens with filtering and pagination
    async getTokens(params: TokenQueryDto): Promise<{ tokens: Token[], total: number }> {
        const where: any = {};

        // Apply search filter (fixed - removed duplicate)
        if (params.search) {
            const searchLower = params.search.toLowerCase();
            where.OR = [
                { name: { contains: searchLower } },
                { symbol: { contains: searchLower } },
                { description: { contains: searchLower } }
            ];
        }

        // Apply symbol filter
        if (params.symbol) {
            where.symbol = params.symbol;
        }

        // Build orderBy with consistent ordering (FIXED - added secondary sort)
        const orderBy: any[] = []; // Changed to array for multiple sorts

        if (params.sort_by) {
            // Map frontend field names to database field names
            const fieldMapping: Record<string, string> = {
                'priceUsd': 'priceUsd',
                'createdAt': 'createdAt',
                'name': 'name',
                'symbol': 'symbol'
            };

            const dbField = fieldMapping[params.sort_by] || params.sort_by;
            orderBy.push({ [dbField]: params.sort_order || 'asc' });
        } else {
            // Default sort by createdAt desc
            orderBy.push({ createdAt: 'desc' });
        }

        // CRITICAL: Always add id as secondary sort for consistent pagination
        orderBy.push({ id: 'asc' });

        // Get total count
        const total = await this.prisma.token.count({ where });

        // Apply pagination
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 10;
        const skip = (page - 1) * limit;

        console.log('Pagination params:', { page, limit, skip, orderBy }); // Enhanced debug

        const tokens = await this.prisma.token.findMany({
            where,
            orderBy, // Use the array of sort orders
            skip,
            take: limit
        });

        return {
            tokens: tokens.map(token => this.toResponseDto(token)),
            total
        };
    }

    // Get token by ID
    async getTokenById(id: string): Promise<Token | null> {
        const token = await this.prisma.token.findUnique({
            where: { id }
        });

        return token ? this.toResponseDto(token) : null;
    }

    // Get token by symbol
    async getTokenBySymbol(symbol: string): Promise<Token | null> {
        const token = await this.prisma.token.findFirst({
            where: { symbol }
        });

        return token ? this.toResponseDto(token) : null;
    }

    // Update token
    async updateToken(id: string, dto: UpdateTokenDto): Promise<Token | null> {
        // Check if token exists
        const existingToken = await this.prisma.token.findUnique({
            where: { id }
        });

        if (!existingToken) {
            return null;
        }

        // Check if symbol already exists (if updating symbol)
        if (dto.symbol) {
            const tokenWithSymbol = await this.prisma.token.findFirst({
                where: {
                    symbol: dto.symbol,
                    NOT: { id }
                }
            });

            if (tokenWithSymbol) {
                throw new Error(`Token with symbol ${dto.symbol} already exists`);
            }
        }

        const updateData: any = {};
        if (dto.logo !== undefined) updateData.logo = dto.logo;
        if (dto.name !== undefined) updateData.name = dto.name;
        if (dto.symbol !== undefined) updateData.symbol = dto.symbol;
        if (dto.totalSupply !== undefined) updateData.totalSupply = dto.totalSupply ? BigInt(dto.totalSupply) : BigInt(0);
        if (dto.priceUsd !== undefined) updateData.priceUsd = dto.priceUsd || 0;
        if (dto.description !== undefined) updateData.description = dto.description;
        if (dto.website !== undefined) updateData.website = dto.website;

        const updatedToken = await this.prisma.token.update({
            where: { id },
            data: updateData
        });

        return this.toResponseDto(updatedToken);
    }

    // Delete token
    async deleteToken(id: string): Promise<boolean> {
        try {
            await this.prisma.token.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Get token statistics
    async getTokenStats(): Promise<{
        total_tokens: number;
        total_market_cap: number;
        average_price: number;
    }> {
        const totalTokens = await this.prisma.token.count();

        const tokensWithPrice = await this.prisma.token.findMany({
            where: {
                priceUsd: { gt: 0 },
                totalSupply: { gt: 0 }
            },
            select: {
                priceUsd: true,
                totalSupply: true
            }
        });

        const totalMarketCap = tokensWithPrice.reduce((sum, token) => {
            const marketCap = Number(token.priceUsd) * Number(token.totalSupply);
            return sum + marketCap;
        }, 0);

        const tokensWithPriceOnly = await this.prisma.token.findMany({
            where: {
                priceUsd: { gt: 0 }
            },
            select: {
                priceUsd: true
            }
        });

        const averagePrice = tokensWithPriceOnly.length > 0
            ? tokensWithPriceOnly.reduce((sum, token) => sum + Number(token.priceUsd), 0) / tokensWithPriceOnly.length
            : 0;

        return {
            total_tokens: totalTokens,
            total_market_cap: totalMarketCap,
            average_price: averagePrice
        };
    }

    // Convert Prisma Token to API Token (convert BigInt and Decimal to number)
    private toResponseDto(prismaToken: PrismaToken): Token {
        return {
            id: prismaToken.id,
            logo: prismaToken.logo,
            name: prismaToken.name,
            symbol: prismaToken.symbol,
            totalSupply: Number(prismaToken.totalSupply),
            priceUsd: Number(prismaToken.priceUsd),
            description: prismaToken.description,
            website: prismaToken.website,
            createdAt: prismaToken.createdAt,
            updatedAt: prismaToken.updatedAt
        };
    }

    // Clean up Prisma connection
    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export default new TokenService();