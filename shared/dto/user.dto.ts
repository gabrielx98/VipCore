import { IsDate, IsEmail, IsString, IsEnum, IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export enum UserRole {
    ADMIN = 'ADMINISTRADOR',
    MEMBRO = 'MEMBRO'
}

export enum UserStatus {
    PENDENTE = 'PENDFENTE',
    APROVADO = 'APROVADO',
    REJEITADO = 'REJEITADO'
}

export class UserDto {
    
    @IsOptional()
    @IsMongoId()
    id?: string;
    
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(UserStatus)
    status: UserStatus;

    @IsString()
    reason: string;

    @IsOptional()
    @IsString()
    enterprise?: string;

    @IsOptional()
    @IsString()
    CNPJ?: string;

    @IsBoolean()
    active: boolean;

    @IsOptional()
    @IsString()
    appraiser?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsMongoId()
    createdBy?: string;

    @IsOptional()
    @IsMongoId()
    updatedBy?: string;
}