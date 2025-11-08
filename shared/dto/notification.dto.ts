import { IsString, IsOptional, IsDate, IsMongoId } from 'class-validator';

export enum NotificationType {
    ALERTA = 'ALERTA',
    INFO = 'INFO',
    AVISO = 'AVISO'
}

export class NotificationDto {
    @IsOptional()
    @IsMongoId()
    id?: string;

    @IsMongoId()
    userId: string;

    @IsString()
    type: string;

    @IsString()
    message: string;

    @IsDate()
    createdAt: Date;
}