import {

IsNumber,
IsOptional,
IsDateString,
IsEnum,
IsMongoId,
IsDate,
Matches
} from 'class-validator';

export enum InvoiceStatus {
A_VENCER = 'À VENCER',
PAGA = 'PAGA',
ATRASADA = 'ATRASADA',
CANCELADA = 'CANCELADA',
}

export class InvoiceDto {
@IsOptional()
@IsMongoId()
id?: string;

@IsMongoId()
userId: string;

@IsDateString()
@Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'formato MM/YYYY',
})
referenceMonth: string;

@IsNumber()
amount: number;

@IsDate()
dueDate: Date;

@IsEnum(InvoiceStatus)
status: InvoiceStatus;

@IsOptional()
@IsDate()
paidAt?: Date;

@IsOptional()
@IsMongoId()
createdBy?: string;

@IsOptional()
@IsMongoId()
updatedBy?: string;

@IsOptional()
@IsDate()
createdAt: Date;

@IsOptional()
@IsDate()
updatedAt: Date;
}


