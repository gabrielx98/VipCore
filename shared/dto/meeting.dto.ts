import { IsDate, IsEnum, IsMongoId, IsString, IsOptional } from 'class-validator';

export enum MeetingStatus {
    AGENDADA = 'AGENDADA',
    EM_PROGRESSO = 'EM PROGRESSO',
    CONCLUIDA = 'CONCLUÍDA',
    CANCELADA = 'CANCELADA'
}

export class MeetingDto {
    @IsOptional()
    @IsMongoId()
    id?: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    date: Date;

    @IsEnum(MeetingStatus)
    status: MeetingStatus;

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