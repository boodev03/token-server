import { Token, PrismaToken } from '../types/token';
import { PrismaClient } from '@prisma/client'
import { CreateTokenDto, TokenQueryDto, UpdateTokenDto } from '../dtos/token.dto';

class TokenService {
    private prisma = new PrismaClient();

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

        if (params.search) {
            const searchLower = params.search.toLowerCase();
            where.OR = [
                { name: { contains: searchLower } },
                { symbol: { contains: searchLower } },
                { description: { contains: searchLower } }
            ];
        }

        if (params.symbol) {
            where.symbol = params.symbol;
        }

        const orderBy: any[] = [];

        if (params.sort_by) {
            const fieldMapping: Record<string, string> = {
                'priceUsd': 'priceUsd',
                'createdAt': 'createdAt',
                'name': 'name',
                'symbol': 'symbol'
            };

            const dbField = fieldMapping[params.sort_by] || params.sort_by;
            orderBy.push({ [dbField]: params.sort_order || 'asc' });
        } else {
            orderBy.push({ createdAt: 'desc' });
        }

        orderBy.push({ id: 'asc' });

        const total = await this.prisma.token.count({ where });

        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 10;
        const skip = (page - 1) * limit;

        console.log('Pagination params:', { page, limit, skip, orderBy });

        const tokens = await this.prisma.token.findMany({
            where,
            orderBy,
            skip,
            take: limit
        });

        return {
            tokens: tokens.map(token => this.toResponseDto(token)),
            total
        };
    }

    async getTokenById(id: string): Promise<Token | null> {
        const token = await this.prisma.token.findUnique({
            where: { id }
        });

        return token ? this.toResponseDto(token) : null;
    }

    async updateToken(id: string, dto: UpdateTokenDto): Promise<Token | null> {
        const existingToken = await this.prisma.token.findUnique({
            where: { id }
        });

        if (!existingToken) {
            return null;
        }

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