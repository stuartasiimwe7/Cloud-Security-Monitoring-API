import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString, IsISO8601, Min } from 'class-validator';

export class GetDbEventsDto {
    @IsOptional()
    @IsString()
    eventSource?: string;

    @IsOptional()
    @IsString()
    eventName?: string;

    @IsOptional()
    @IsString()
    awsRegion?: string;

    @IsOptional()
    @IsISO8601()
    from?: string;

    @IsOptional()
    @IsISO8601()
    to?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';
}

