import { IsEnum, IsOptional, IsMongoId, IsDate } from 'class-validator';

export enum AttendanceStatus {
    PRESENTE = 'PRESENTE',
    ATRASADO = 'ATRASADO',
    AUSENTE = 'AUSENTE'
}

export class AttendanceDto {
    @IsOptional()
    @IsMongoId()
    id?: string;

    @IsMongoId()
    meetingId: string;

    @IsMongoId()
    userId: string;

    @IsDate()
    checkInTime: Date; 

    @IsEnum(AttendanceStatus)
    status: AttendanceStatus;

}