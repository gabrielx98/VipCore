import { Injectable } from '@nestjs/common';
import { InvoiceDto } from '@shared/dto/invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>
  ) {}

  async create(createInvoiceDto: InvoiceDto) : Promise<Invoice> {
    const invoice = new this.invoiceModel(createInvoiceDto);
    return await invoice.save();
  }
    
  async findAll() : Promise<Invoice[]> {
    return await this.invoiceModel.find().exec();
  }

  async findOne(id: number) : Promise<Invoice | null> {
    return await this.invoiceModel.findById(id).exec();
  }

  async update(id: number, updateInvoiceDto: InvoiceDto) : Promise<Invoice | null> {
    return await this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, { new: true }).exec();
  }

  async remove(id: number) : Promise<Invoice | null> {
    return await this.invoiceModel.findByIdAndDelete(id).exec();
  }
}
