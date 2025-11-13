import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceDto } from '@shared/dto/invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('/generate')
  async generateMonthlyInvoices(@Body() referenceMounth: string) {
    return await this.invoicesService.generateMonthlyInvoices(referenceMounth);
  }

  @Get()
  async findAll() {
    return await this.invoicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() status: string) {
    return await this.invoicesService.updateStatus(+id, status);
  }

}
