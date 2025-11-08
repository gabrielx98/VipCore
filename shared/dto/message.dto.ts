import { IsDate, IsEnum, IsString, IsOptional } from 'class-validator';

export enum MessageTarget {
    TODOS = 'todos',
    ADMIN = 'admin'
}

export class MessageDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsEnum(MessageTarget)
    target: MessageTarget;

    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    @IsString()
    updatedBy?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}