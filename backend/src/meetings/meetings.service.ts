import { Injectable } from '@nestjs/common';
import { MeetingDto, MeetingStatus } from '@shared/dto/meeting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from './entities/meeting.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MeetingsService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<Meeting>
  ) {}

  async create(createMeetingDto: MeetingDto) : Promise<ResponseApi<Meeting>> {
    const meeting = new this.meetingModel(createMeetingDto);
    try {
      await meeting.save();
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Reunião criada com sucesso',
            data: {},
          } as ResponseApi<Meeting>;
    } catch (error) {
      return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao criar reunião: ' + error,
            data: {},
          } as ResponseApi<Meeting>;
    }

  }

  async findAll() : Promise<ResponseApi<Meeting[]>> {
    try {
     const data = await this.meetingModel.find().exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Meeting[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar lista de reuniões: ' + error,
        data: [],
      } as ResponseApi<Meeting[]>;
     }
  }

  async findOne(id: number) : Promise<ResponseApi<Meeting>> {
    try {
     const data =  await this.meetingModel.findById(id).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Meeting>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar reunião: ' + error,
        data: {},
      } as ResponseApi<Meeting>;
     }
  }

  async update(id: number, updateMeetingDto: MeetingDto) : Promise<ResponseApi<Meeting>> {
    try {
     await this.meetingModel.findByIdAndUpdate(id, updateMeetingDto, { new: true }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: {},
     } as ResponseApi<Meeting>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao atualizar reunião: ' + error,
        data: {},
      } as ResponseApi<Meeting>;
     }
  }

  async remove(id: number) : Promise<ResponseApi<Meeting>> {
    try {
     await this.meetingModel.findByIdAndUpdate(id,{status: MeetingStatus.CANCELADA}).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: {},
     } as ResponseApi<Meeting>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao deletar reunião: ' + error,
        data: {},
      } as ResponseApi<Meeting>;
     }
  }
}
