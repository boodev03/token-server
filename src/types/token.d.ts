import { Decimal } from '@prisma/client/runtime/library';

// Prisma Token type (what Prisma actually returns)
export interface PrismaToken {
    id: string;
    symbol: string;
    logo: string;
    name: string;
    totalSupply: bigint;
    priceUsd: Decimal;
    description: string;
    website: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// API Response Token type (what we send to frontend)
export interface Token {
    id: string;
    symbol: string;
    logo: string;
    name: string;
    totalSupply: number;
    priceUsd: number;
    description: string;
    website: string | null;
    createdAt: Date;
    updatedAt: Date;
}