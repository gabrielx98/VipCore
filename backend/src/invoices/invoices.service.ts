import { Injectable } from '@nestjs/common';
import { InvoiceDto } from '@shared/dto/invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './entities/invoice.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InvoicesService {
  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>, private readonly userModel: Model<User>
  ) { }

  async create(createInvoiceDto: InvoiceDto): Promise<Invoice> {
    const invoice = new this.invoiceModel(createInvoiceDto);
    return await invoice.save();
  }

  async generateMonthlyInvoices(referenceMonth: string): Promise<ResponseApi<Invoice>> {
    try {
      const activeUsers = await this.userModel.find({ isActive: true }).exec();
      activeUsers.map(user => {
        const invoice = new this.invoiceModel({
          userId: user._id,
          referenceMonth: referenceMonth,
          amount: 100,
          dueDate: new Date(new Date(referenceMonth + '-01').setMonth(new Date(referenceMonth + '-01').getMonth() + 1)),
          status: 'PENDING',
        });
        const isSaved = this.invoiceModel.findOne({ userId: user._id, referenceMonth }).exec();
        if (!isSaved) {
          invoice.save();
        }
      });
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Mensalidades geradas com sucesso',
            data: {},
          } as ResponseApi<Invoice>;

    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao gerar mensalidades: ' + error,
        data: {},
      } as ResponseApi<Invoice>;
    }
  }

  async findAll(): Promise<ResponseApi<Invoice[]>> {
    try {
      const data = await this.invoiceModel.find().exec();
      return {
        statusCode: HttpStatus.OK,
        message: 'Operação realizada com sucesso',
        data: data,
      } as ResponseApi<Invoice[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar faturas: ' + error,
        data: [],
      } as ResponseApi<Invoice[]>;
    }
  }

  async findOne(id: number): Promise<ResponseApi<Invoice>> {
    try {
      const data = await this.invoiceModel.findById(id).exec();
      return {
        statusCode: HttpStatus.OK,
        message: 'Operação realizada com sucesso',
        data: data,
      } as ResponseApi<Invoice>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar fatura: ' + error,
        data: {},
      } as ResponseApi<Invoice>;
    }
  }

  async updateStatus(id: number, status: string): Promise<ResponseApi<Invoice>> {
    try {
      const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
      return {
        statusCode: HttpStatus.OK,  
        message: 'Fatura atualizada com sucesso',
        data: {},
      } as ResponseApi<Invoice>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar fatura: ' + error,
        data: {},
      } as ResponseApi<Invoice>;
    }
  }

  async update(id: number, updateInvoiceDto: InvoiceDto): Promise<ResponseApi<Invoice>> {
    try {
      const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, { new: true }).exec();
      return {
        statusCode: HttpStatus.OK,
        message: 'Fatura atualizada com sucesso',
        data: {},
      } as ResponseApi<Invoice>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar fatura: ' + error,
        data: {},
      } as ResponseApi<Invoice>;
    }
  }

  async remove(id: number): Promise<Invoice | null> {
    return await this.invoiceModel.findByIdAndDelete(id).exec();
  }
}
