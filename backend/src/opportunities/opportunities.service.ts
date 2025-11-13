import { Injectable } from '@nestjs/common';
import { OpportunityDto } from '@shared/dto/opportunity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Opportunity } from './entities/opportunity.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class OpportunitiesService {
  constructor(@InjectModel(Opportunity.name) private opportunityModel: Model<Opportunity>
  ) {}

  async create(createOpportunityDto: OpportunityDto) : Promise<ResponseApi<Opportunity>> {
    const opportunity = new this.opportunityModel(createOpportunityDto);
    try {
      await opportunity.save();
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Oportunidade criada com sucesso',
            data: {},
          } as ResponseApi<Opportunity>;
    } catch (error) {
      return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar oportunidade: ' + error,
            data: {},
          } as ResponseApi<Opportunity>;
    }
  }

  async findAll() : Promise<ResponseApi<Opportunity[]>> {
    try {
     const data = await this.opportunityModel.find().exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Opportunity[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar lista de oportunidades: ' + error,
        data: [],
      } as ResponseApi<Opportunity[]>;
     }
  }

  async findAllByUser(userId: string) : Promise<ResponseApi<Opportunity[]>> {
    try {
     const data =  await this.opportunityModel.find({ toUser: userId}).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Opportunity[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar oportunidade: ' + error,
        data: {},
      } as ResponseApi<Opportunity[]>;
     }
  }

  async update(id: number, updateOpportunityDto: OpportunityDto) : Promise<ResponseApi<Opportunity>> {
    try {
     const data = await this.opportunityModel.findByIdAndUpdate(id, updateOpportunityDto, { new: true }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Oportunidade atualizada com sucesso',
      data: data,
     } as ResponseApi<Opportunity>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar oportunidade: ' + error,
        data: {},
      } as ResponseApi<Opportunity>;
     }
  }

  async remove(id: number) : Promise<ResponseApi<Opportunity>> {
    try {
     const data = await this.opportunityModel.findByIdAndDelete(id).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Oportunidade removida com sucesso',
      data: data,
     } as ResponseApi<Opportunity>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao remover oportunidade: ' + error,
        data: {},
      } as ResponseApi<Opportunity>;
     }
  }
}
