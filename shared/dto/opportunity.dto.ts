import { IsString, IsEnum, IsDate, IsOptional, IsMongoId } from 'class-validator';

export enum OpportunityStatus {
    ENVIADA = 'ENVIADA',
    EM_ANDAMENTO = 'EM ANDAMENTO',
    RECUSADA = 'RECUSADA',
    CONCLUIDA = 'CONCLUIDA'
}

export class OpportunityDto {
    @IsOptional()
    @IsMongoId()
    id?: string;

    @IsMongoId()
    fromUser: string;

    @IsMongoId()
    toUser: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(OpportunityStatus)
    status?: OpportunityStatus;

    @IsOptional()
    @IsMongoId()
    createdBy?: string;

    @IsOptional()
    @IsMongoId()
    updatedBy?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}