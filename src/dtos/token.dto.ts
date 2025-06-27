import {
    IsString,
    IsOptional,
    IsNumber,
    IsUrl,
    IsUUID,
    Length,
    Min,
    Max,
    IsAlphanumeric,
    IsIn,
    IsPositive,
    Matches
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateTokenDto {
    @IsString({ message: 'Name must be a string' })
    @Length(2, 100, { message: 'Name must be between 2-100 characters' })
    name!: string;

    @IsString({ message: 'Symbol must be a string' })
    @Length(1, 20, { message: 'Symbol must be between 1-20 characters' })
    @IsAlphanumeric('en-US', { message: 'Symbol must contain only letters and numbers' })
    @Transform(({ value }) => value ? value.toUpperCase() : value)
    symbol!: string;

    @IsOptional()
    @IsNumber({}, { message: 'Total supply must be a number' })
    @IsPositive({ message: 'Total supply must be positive' })
    @Type(() => Number)
    totalSupply!: number;

    @IsOptional()
    @IsNumber({}, { message: 'Price USD must be a number' })
    @IsPositive({ message: 'Price USD must be positive' })
    @Type(() => Number)
    priceUsd!: number;

    @IsOptional()
    @IsString({ message: 'Website must be a string' })
    website?: string;

    @IsString({ message: 'Logo must be a string' })
    logo!: string;

    @IsString({ message: 'Description must be a string' })
    @Length(0, 1000, { message: 'Description must not exceed 1000 characters' })
    description!: string;
}

export class UpdateTokenDto extends CreateTokenDto {
}

export class TokenParamsDto {
    @IsUUID(4, { message: 'Invalid token ID format' })
    id!: string;
}

export class TokenSymbolParamsDto {
    @IsString({ message: 'Symbol must be a string' })
    @Length(1, 20, { message: 'Symbol must be between 1-20 characters' })
    @IsAlphanumeric('en-US', { message: 'Symbol must contain only letters and numbers' })
    @Transform(({ value }) => value ? value.toUpperCase() : value)
    symbol!: string;
}

export class TokenQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Page must be a number' })
    @Min(1, { message: 'Page must be at least 1' })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Limit must be a number' })
    @Min(1, { message: 'Limit must be at least 1' })
    @Max(100, { message: 'Limit must not exceed 100' })
    limit?: number = 10;

    @IsOptional()
    @IsString({ message: 'Search must be a string' })
    @Length(1, 100, { message: 'Search term must be between 1-100 characters' })
    search?: string;

    @IsOptional()
    @IsString({ message: 'Symbol must be a string' })
    @IsAlphanumeric('en-US', { message: 'Symbol must contain only letters and numbers' })
    @Transform(({ value }) => value ? value.toUpperCase() : value)
    symbol?: string;

    @IsOptional()
    @IsString({ message: 'Sort by must be a string' })
    @IsIn(['name', 'symbol', 'priceUsd', 'createdAt'], {
        message: 'Sort by must be one of: name, symbol, priceUsd, createdAt'
    })
    sort_by?: 'name' | 'symbol' | 'priceUsd' | 'createdAt';

    @IsOptional()
    @IsString({ message: 'Sort order must be a string' })
    @IsIn(['asc', 'desc'], { message: 'Sort order must be asc or desc' })
    sort_order?: 'asc' | 'desc';
}